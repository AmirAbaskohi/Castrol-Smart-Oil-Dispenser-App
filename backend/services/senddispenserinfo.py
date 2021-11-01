import json

from azure.iot.device.aio import IoTHubDeviceClient

#  """uncomment to test"""
# import asyncio
# import iotdevices


class SendDispensingIinfo:
    def __init__(self, conn_str):
        self.conn_str = conn_str

    async def send_oil_quantity(self, quantity, oil_type_id):
        # Create instance of the device client using the authentication provider
        device_client = IoTHubDeviceClient.create_from_connection_string(self.conn_str)
        # time.sleep(3)

        # Connect the device client.
        await device_client.connect()
        # time.sleep(3)
        print("device connected")

        # create dispense data
        msg = json.dumps({"data": {"quantity": quantity, "oil_type_id": oil_type_id}})
        print("Sending message:" + msg)
        # send dispense data
        await device_client.send_message(msg)
        print("Message successfully sent!")
        # time.sleep(3)

        # finally, disconnect
        await device_client.disconnect()

    async def send_dispense_info(
        self,
        id,
        created_at,
        car_registration_number,
        car_manufacturer,
        car_model,
        car_engine_type,
        suggested_quantity,
        dispensed_quantity,
        dispense_type,
        name,
        oil_type,
        remaining_quantity,
        remaining_quantity_perc,
    ):
        # Create instance of the device client using the authentication provider
        device_client = IoTHubDeviceClient.create_from_connection_string(self.conn_str)

        # Connect the device client.
        await device_client.connect()

        # create dispense data
        msg = json.dumps(
            {
                "data": {
                    "id": id,
                    "created_at": created_at,
                    "car_registration_number": car_registration_number,
                    "car_manufacturer": car_manufacturer,
                    "car_model": car_model,
                    "car_engine_type": car_engine_type,
                    "suggested_quantity": suggested_quantity,
                    "dispensed_quantity": dispensed_quantity,
                    "dispense_type": dispense_type,
                    "name": name,
                    "oil_type": oil_type,
                    "remaining_quantity": remaining_quantity,
                    "remaining_quantity_perc": remaining_quantity_perc,
                }
            }
        )
        print("Sending message:" + msg)
        # send dispense data
        await device_client.send_message(msg)
        print("Message successfully sent!")

        # finally, disconnect
        await device_client.disconnect()


class SendOrderinfo:
    def __init__(self, conn_str):
        self.conn_str = conn_str

    async def send_order_info(self, id, created_at, total_volume, oil_type, name):
        # Create instance of the device client using the authentication provider
        device_client = IoTHubDeviceClient.create_from_connection_string(self.conn_str)

        # Connect the device client.
        await device_client.connect()

        # create dispense data
        msg = json.dumps(
            {
                "data": {
                    "id": id,
                    "created_at": created_at,
                    "total_volume": total_volume,
                    "oil_type": oil_type,
                    "name": name,
                }
            }
        )
        print("Sending message:" + msg)

        # send dispense data
        await device_client.send_message(msg)
        # print("Message successfully sent!")

        # finally, disconnect
        await device_client.disconnect()


#  """uncomment to test"""
# send_info_to_azure = SendDispensingIinfo(iot_devices["rd01"])
# asyncio.run(send_info_to_azure.send_oil_quantity("7L", "1"))
# asyncio.run(
#     send_info_to_azure.send_dispense_info("110 ", "01/08/21 09:00:00", "FP13FVH", "BMW", "3 Series", "316d",
#                                           "5.4", "5.4", "Dispense Flow", "Mohsen", "EDGE 5W-40", "2.3", "3.3")
# )
