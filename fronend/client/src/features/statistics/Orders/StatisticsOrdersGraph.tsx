import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { TemplatePage } from '../../TemplatePage/TemplatePage';

import styles from './StatisticsOrdersGraph.module.css';

const data = [
  {
    year: '2010',
    Amt: 20,
  },
  {
    year: '2011',
    Amt: 8,
  },
  {
    year: '2012',
    Amt: 60,
  },
  {
    year: '2013',
    Amt: 17,
  },
  {
    year: '2014',
    Amt: 30,
  },
  {
    year: '2015',
    Amt: 10,
  },
  {
    year: '2016',
    Amt: 80,
  },
  {
    year: '2017',
    Amt: 13,
  },
  {
    year: '2018',
    Amt: 40,
  },
  {
    year: '2019',
    Amt: 32,
  },
  {
    year: '2020',
    Amt: 70,

  },
];

export const StatisticsOrdersGraph = () => {
  const renderBody = () =>
    <div style={{ width: '90%' }} className={styles.content}>
      <AreaChart width={700} height={250} data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs> <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#99cfe0" stopOpacity={0.8} />
          <stop offset="60%" stopColor="#99cfe0" stopOpacity={0.5} />
          <stop offset="95%" stopColor="#99cfe0" stopOpacity={0} />
        </linearGradient>
        </defs>
        <XAxis dataKey="year" name="year" />
        <YAxis dataKey="Amt" unit="m($)" name="Amount" />

        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }}
          labelFormatter={(name) => 'Year: ' + name} />
        <Legend />
        <Area name="Amount m($)" type="monotone" dataKey={"Amt"} stroke="#5e7bce" fillOpacity={1} fill="url(#colorUv)" />
        <Area name="Year" type="monotone" dataKey="" stroke="red" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </div>

  return (
    <TemplatePage showBackButton={true} backPath='/statistics/orders' showNextButton={false} handleBack={() => { }} title='Graph'>
      {renderBody()}
    </TemplatePage>
  );
}