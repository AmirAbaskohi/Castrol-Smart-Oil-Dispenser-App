import random
from faker import Faker
from faker_vehicle import VehicleProvider
from datetime import datetime
import senddispenserinfo
import iotdevices, asyncio


data = {
    "id": [],
    "created_at": [],
    "car_registration_number": [],
    "car_manufacturer": [],
    "car_model": [],
    "car_engine_type": [],
    "suggested_quantity": [],
    "dispensed_quantity": [],
    "dispense_type": [],
    "name": [],
    "oil_type": [],
    "remaining_quantity": [],
    "remaining_quantity_perc": [],
}


class CreateDummyData:
    """
    {"data":
    {
    # "id": 103,                                            DONE
    "created_at": "2021-09-07, 11:23:50",                   DONE
    "car_registration_number": "RS21DFR",                   DONE
    "car_manufacturer": null,                               DONE
    "car_model": null,                                      DONE
    "car_engine_type": null,                                DONE
    "suggested_quantity": 4.5,                              DONE
    "dispensed_quantity": 4.5,                              DONE
    "dispense_type": "registration-number-flow",            DONE
    "name": "NAMES",                                        DONE
    "oil_type": "EDGE 5W-40",                               DONE
    "remaining_quantity": 121.77,                           DONE
    "remaining_quantity_perc": 58.53,                       DONE
    """

    def __init__(self, faker_locale, num_of_records):
        print("Class Created")
        self.fake = Faker(faker_locale)
        self.fake.add_provider(VehicleProvider)
        self.num_of_records = num_of_records
        self.fake.add_provider(VehicleProvider)
        Faker.seed(123)

    # create ID
    def create_id(self, field):
        for _ in range(self.num_of_records):
            id = _
            field.append(id)

    # datetime creator
    def create_datetime(self, field):
        for _ in range(self.num_of_records):
            start_date = datetime(2021, 8, 1)
            end_date = datetime.today()
            dt = self.fake.date_time_between_dates(
                datetime_start=start_date, datetime_end=end_date
            )
            field.append(dt.strftime("%Y-%m-%d, %H:%M:%S"))

    # creating the reg_num
    def create_reg_num(self, field):
        for _ in range(self.num_of_records):
            reg = self.fake.license_plate()
            field.append(reg)

    # car manufacturer creator
    def create_veh_details(self, field):
        for _ in range(self.num_of_records):
            car_manu = self.fake.vehicle_object()
            field.append(car_manu)

    # create quantities (suggested/dispensed/remaining_quantity)
    def create_quantities(self, field, min, max, percentage=False):
        for _ in range(self.num_of_records):
            oil_amount = round(
                self.fake.pyfloat(
                    left_digits=None,
                    right_digits=None,
                    positive=True,
                    min_value=min,
                    max_value=max,
                ),
                1,
            )
            if percentage:
                field.append(str(oil_amount) + "%")
            else:
                field.append(oil_amount)

    # flow creator
    def create_flow(self, field):
        flows = ["registration-number-flow", "vehicle-details-flow", "quantity-flow"]
        for _ in range(self.num_of_records):
            field.append(random.choice(flows))

    # name creator
    def create_name(self, field):
        for _ in range(self.num_of_records):
            name = self.fake.name()
            field.append(name)

    # choosing the oil type randomly
    def create_oil_type(self, field):
        barrel_types = ["EDGE 5W-40", "Magnatec 5W-40 MP"]
        for _ in range(self.num_of_records):
            oil_type = random.choice(barrel_types)
            field.append(oil_type)

    # calculate the remaining percentage of the barrel based on the quantity
    def create_oil_perc(self, field, remaining_in_barrel):
        barrel_sizes = [50, 208]

        percentage_cond = True
        while percentage_cond:
            chosen_barrel = random.choice(barrel_sizes)
            # print(chosen_barrel)
            if remaining_in_barrel < chosen_barrel:
                percentage_cond = False
                percentage = (remaining_in_barrel / chosen_barrel) * 100
                field.append(percentage)
                break

    # create engine type
    def create_eng(self, field):
        engines = [
            "Geartronic 2.0",
            "1.6 dCi Tekna",
            "2.8 CRD SE",
            "C300",
            "325i",
            "E220d",
            "1.8 dCi",
            "2.0 Multijet 4x4 Cross Plus",
            "2.0 TiVCT Titanium CVT",
            "1.6 GDi Blue Drive SE Nav",
            "1.4 GSi",
            "2.0 TDI S line",
            "1.4 TFSI e-tron",
            "2.0 eD4 SE",
            "2.5 V6 GS",
            "1.6 Hybrid4 300 GT Line",
            "1.4 16v GLAM",
        ]
        for _ in range(self.num_of_records):
            eng = random.choice(engines)
            field.append(eng)


def dummy_data_creator():
    dummy_data = CreateDummyData("en_GB", 100)

    dummy_data.create_id(data["id"])
    dummy_data.create_datetime(data["created_at"])
    dummy_data.create_reg_num(data["car_registration_number"])
    dummy_data.create_veh_details(data["car_manufacturer"])
    data["car_model"] = data["car_manufacturer"]
    dummy_data.create_eng(data["car_engine_type"])
    dummy_data.create_quantities(data["suggested_quantity"], 1, 6)
    dummy_data.create_quantities(data["dispensed_quantity"], 1, 6)
    dummy_data.create_flow(data["dispense_type"])
    dummy_data.create_name(data["name"])
    dummy_data.create_oil_type(data["oil_type"])
    dummy_data.create_quantities(data["remaining_quantity"], 10, 45)
    dummy_data.create_quantities(data["remaining_quantity_perc"], 1, 100, True)

    return data


# sending the data to the IoT Hub
send_info_to_azure = senddispenserinfo.SendDispensingIinfo(
    iotdevices.iot_devices["rd01"]
)

dummy_data = dummy_data_creator()

for i in range(len(dummy_data["id"])):
    print(i)
    asyncio.run(
        send_info_to_azure.send_dispense_info(
            dummy_data["id"][i],
            dummy_data["created_at"][i],
            dummy_data["car_registration_number"][i],
            dummy_data["car_manufacturer"][i]["Make"],
            dummy_data["car_model"][i]["Model"],
            dummy_data["car_engine_type"][i],
            dummy_data["suggested_quantity"][i],
            dummy_data["dispensed_quantity"][i],
            dummy_data["dispense_type"][i],
            dummy_data["name"][i],
            dummy_data["oil_type"][i],
            dummy_data["remaining_quantity"][i],
            dummy_data["remaining_quantity_perc"][i],
        )
    )
