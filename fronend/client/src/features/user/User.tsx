import { TemplatePage } from '../TemplatePage/TemplatePage';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import { MultipleSelect } from "../select-dropdown/SelectDropdown"

import styles from './User.module.css';

const columns: GridColDef[] = [
  {
    field: 'order',
    headerName: 'Order',
    headerClassName: 'gridHeader',
    cellClassName: 'gridCell',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    width: 200
  },
  {
    field: 'vehicleNo',
    headerName: 'Vehicle Number',
    headerClassName: 'gridHeader',
    width: 200,
    sortable: false,
    filterable: false,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: 'date',
    headerName: 'Date',
    headerClassName: 'gridHeader',
    width: 220,
    cellClassName: 'gridCellDate',
    filterable: false,
    disableColumnMenu: true,
    editable: false,
    sortable: true
  }
];

const rows = [

  { id: 1, order: '4.9 L EDGE 5W-40', vehicleNo: 'AS67 UBS', date: 'Sep 20, 2021 08:10:25' },
  { id: 2, order: '3.5 L EDGE 5W-40', vehicleNo: 'UD89 WPQ', date: 'Sep 19, 2021 08:10:35' },
  { id: 3, order: '4.7 L Magnetec 5W-40 MP', vehicleNo: 'TD57 ABD', date: 'Sep 15, 2021 09:22:29' },
  { id: 4, order: '3.5 L EDGE 5W-40', vehicleNo: 'YE45 ADG', date: 'Sep 15, 2021 10:30:19' },
  { id: 5, order: '5.5 L Magnetec 5W-40 MP', vehicleNo: 'HD42 QHP', date: 'Sep 12, 2021 12:10:49' },
  { id: 6, order: '5.5 L EDGE 5W-40', vehicleNo: 'TD57 TWS', date: 'Sep 10, 2021 09:45:22' },
];

const useStyles = makeStyles({
  root: {
    '& .gridHeader': {
      color: '#000000',
      fontWeight: "bold",
      textAlign: 'center'
    },
    '& .gridCell': {
      fontWeight: "bold",
    },
    '& .gridCellDate': {
      wordWrap: "break-word"
    }
  },
});

export const User = () => {
  const classes = useStyles();

  const renderBody = () =>
    <div className={classes.root} style={{ width: "700px" }} >
      <div style={{ height: 280, width: '90%', marginLeft: '5%' }}>
        <DataGrid
          headerHeight={40}
          rowHeight={35}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick={true}
        />
      </div>
    </div>

  return (
    <TemplatePage showBackButton={true} backPath='/home' showNextButton={false} handleBack={() => { }} title='Consumer info'>
      {renderBody()}
    </TemplatePage>
  );
}