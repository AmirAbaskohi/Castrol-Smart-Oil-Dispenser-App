export const categories = [{
  id: '1',
  name: 'Cars',
}, {
  id: '2',
  name: 'Light commercial vehicles (< 7.5t)',
}, {
  id: '3',
  name: 'Motorcycles, Scooters, Mopeds, Quads (ATV)',
}, {
  id: '4',
  name: 'Trucks and Buses (> 7.5t)',
}];

export const carManufacturers = [
  {
    name: "Audi",
    id: "1"
  },
  {
    name: "Bentley",
    id: "2"
  },
  {
    name: "BMW",
    id: "3"
  },
  {
    name: "Chevrolet",
    id: "4"
  },
  {
    name: "Chrysler",
    id: "5"
  },
  {
    name: "Fiat",
    id: "6"
  },
  {
    name: "Ford",
    id: "7"
  },
  {
    name: "Honda",
    id: "8"
  },
  {
    name: "Hyundai",
    id: "9"
  },
  {
    name: "Jaguar",
    id: "10"
  },
  {
    name: "Jeep",
    id: "11"
  },
  {
    name: "Kia",
    id: "12"
  },
  {
    name: "Land Rover",
    id: "13"
  },
  {
    name: "Maybach",
    id: "14"
  },
  {
    name: "Mazda",
    id: "15"
  },
  {
    name: "Mercedes-Benz",
    id: "16"
  },
  {
    name: "Mini",
    id: "17"
  },
  {
    name: "Nissan",
    id: "18"
  },
  {
    name: "Opel",
    id: "19"
  },
  {
    name: "Peugeot",
    id: "20"
  }
];

export const models = [{
  id: '1',
  name: 'A1, GB (2018- )'
}, {
  id: '2',
  name: 'A1, S1, 8X (2010-2018)'
}, {
  id: '3',
  name: 'A2, 8Z (2000-2005)'
}, {
  id: '4',
  name: 'A3, 8Y (2020- )'
}, {
  id: '5',
  name: 'A3 Cabriolet, 8P7 (2008-2013)'
}, {
  id: '6',
  name: 'A3, S3, 8L (1996-2003)'
}, {
  id: '7',
  name: 'A3, S3 Cabriolet, 8V7 (2013-2020)'
}, {
  id: '8',
  name: 'A3, S3, RS 3, 8V (2012-2020)'
}, {
  id: '9',
  name: 'A3, S3, RS 3, 8P (2003-2013)'
}, {
  id: '10',
  name: 'A4 Allroad, 8KH (2009-2016)'
}, {
  id: '11',
  name: 'A4 Allroad, 8W (2016- )'
}, {
  id: '12',
  name: 'A4, S4, RS 4, 8W (2015- )'
}, {
  id: '13',
  name: 'A4, S4, RS 4, 8K (2007-2016)'
}, {
  id: '14',
  name: 'A4, S4, RS 4, 8D (1994-2001)'
}, {
  id: '15',
  name: 'A4, S4, RS 4, 8E (2001-2008)'
}, {
  id: '16',
  name: 'A5, S5 Cabriolet, F57 (2017- )',
}];

export const types = [{
  id: '1',
  name: 'A1 1.0 TFSI (60 kW) (2015-2018)',
}, {
  id: '2',
  name: 'A1 1.0 TFSI (70 kW) (2015-2018)',
}, {
  id: '3',
  name: 'A1 1.2 TDI (2010-2015)',
}, {
  id: '4',
  name: 'A1 1.2 TFSI (63 kW) (2010-2015)',
}, {
  id: '5',
  name: 'A1 1.4 TDI (2014-2018)',
}];

export const oilTypes = {
  quantity: '5.2',
  types: [{
    id: '1',
    name: 'EDGE 5W-40',
  }, {
    id: '2',
    name: 'Magnatec 5W-40 MP',
  }],
};

export const transaction = [{
  id: '1',
  mechanicName: 'Cristian',
  dateStamp: '2021-03-10',
  quantity: '3.5L',
  vehicleNo: 'AAA19AA',
  oilType: 'EDGE 10W-60'
}, {
  id: '2',
  mechanicName: 'Roy',
  dateStamp: '2021-04-10',
  quantity: '4.5L',
  vehicleNo: 'PAA19AA',
  oilType: 'EDGE 5W-40'
}, {
  id: '3',
  mechanicName: 'Hari',
  dateStamp: '2021-04-10',
  quantity: '4.5L',
  vehicleNo: 'DCA19AA',
  oilType: 'EDGE 5W-40'
}, {
  id: '4',
  mechanicName: 'Athiq',
  dateStamp: '2021-05-10',
  quantity: '2.5L',
  vehicleNo: 'VAA19AA',
  oilType: 'EDGE 5W-40'
},
{
  id: '5',
  mechanicName: 'Mohsen',
  dateStamp: '2021-06-12',
  quantity: '6.5L',
  vehicleNo: 'QRA19AA',
  oilType: 'EDGE 10W-60'
},
{
  id: '6',
  mechanicName: 'Kiran',
  dateStamp: '2021-06-10',
  quantity: '5.5L',
  vehicleNo: 'BAA19AA',
  oilType: 'EDGE 5W-40'
}];

export const statsTransaction = [

  { id: 1, order: '3.5L EDGE 5W-40', vehicleNo: 'AS67 UBS', mechanic: 'Cristian Luca', date: 'March 21,2020 00:28' },
  { id: 2, order: '4.5L EDGE 10W-40', vehicleNo: 'TDS7 TBD', mechanic: 'Hari Shaw', date: 'March 21,2020 00:35' },
  { id: 3, order: '5.5L EDGE 10W-60', vehicleNo: 'UD89 WPQ', mechanic: 'Peter Jackson', date: 'March 20,2020 00:28' },
  { id: 4, order: '3.5L EDGE 5W-40', vehicleNo: 'UD89 WPQ', mechanic: 'Athiq Ahmed', date: 'March 18,2020 00:28' },
  { id: 5, order: '3.5L EDGE 5W-40', vehicleNo: 'YE49 ADG', mechanic: 'William Walker', date: 'March 21,2020 00:28' },
  { id: 6, order: '4.5L EDGE 10W-50', vehicleNo: 'UD89 WPQ', mechanic: 'Nick Peterson', date: 'March 25,2020 00:28' },
  { id: 7, order: '5.5L EDGE 5W-40', vehicleNo: 'AS67 UBS', mechanic: 'Paul Miller', date: 'March 31,2020 00:28' },
  { id: 8, order: '3.5L EDGE 5W-40', vehicleNo: 'AS67 UBS', mechanic: 'Rossini Harvey', date: 'March 11,2020 00:28' },
  { id: 9, order: '7.5L EDGE 5W-40', vehicleNo: 'UD89 WPQ', mechanic: 'Harvey', date: 'March 21,2020 00:28' },
];

export const getRecommendedQuantity = () => '5.2';

export const getRemainingInBarrel = () => '76,62 L (36.84%)';

export const getRecommendedOilBasedOnRegistrationNumber = (registrationNumber: string) => {
  if (registrationNumber.length >= 5 && registrationNumber.length <= 10) {
    return {
      carDetails: 'Volkswagen (VW) (EU) Passat B7, 3C/36 (2010-2015)',
      oil: {
        quantity: '5.2',
        types: [{
          id: '1',
          name: 'EDGE 5W-40',
        }, {
          id: '2',
          name: 'Magnatec 5W-40 MP',
        }],
      }
    };
  }
}