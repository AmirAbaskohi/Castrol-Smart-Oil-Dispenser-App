import { TemplatePage } from '../../TemplatePage/TemplatePage';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import { useEffect, useState, useCallback } from "react";

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { statsDispenseTransactions } from '../StatisticsTransactionSlice';
import { MultipleSelect } from "../../select-dropdown/SelectDropdown"
import { names } from "../../select-dropdown/SelectDropdown";
import { StatsDateTime } from '../StatsDateTime';
import { userAuthState } from '../../user/userSlice';
import { UserAuth } from '../../../types';

import styles from '../Statistics.module.css';

const columns: GridColDef[] = [
  {
    field: 'dispensed_quantity',
    headerName: 'Qty (L)',
    headerClassName: 'gridHeader',
    cellClassName: 'gridCell',
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    width: 100,
  },
  {
    field: 'oil_type',
    headerName: 'Oil Type',
    headerClassName: 'gridHeader',
    cellClassName: 'gridCell',
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    width: 170
  },
  {
    field: 'car_registration_number',
    headerName: 'Vehicle Number',
    headerClassName: 'gridHeader',
    cellClassName: 'gridCelCarNo',
    width: 160,
    sortable: true,
    filterable: false,
    editable: false,
    disableColumnMenu: true
  },
  {
    field: 'created_at',
    headerName: 'Date',
    headerClassName: 'gridHeader',
    width: 190,
    cellClassName: 'gridCellDate',
    filterable: false,
    disableColumnMenu: true,
    editable: false,
    sortable: true
  }
];

const useStyles = makeStyles({
  root: {
    '& .gridHeader': {
      color: '#A9A9A9',
    },
    '& .gridCell': {
      fontWeight: "bold",
    },
    '& .gridCellDate': {
      wordWrap: "break-word",
      textAlign: "center",
    },
    '& .gridCelCarNo': {
      textAlign: "center",
    }
  }
});

export const StatisticsDispenseTransactions = () => {
  const dispatch = useAppDispatch();
  const [dispenseData, setDispenseData] = useState<any[]>([]);
  const userStore = useAppSelector(userAuthState) as UserAuth;

  const getTransactionDetails = useCallback(() => {
    let data: any;

    dispatch(statsDispenseTransactions(userStore.id))
      .then(transactionData => {
        if (transactionData.payload) {
          const receivedData = transactionData.payload || [];
          const sortedData = receivedData.sort((a: any, b: any) => a.created_at >= b.created_at ? -1 : 1);

          data = sortedData.map((x: any) => ({
            id: x.id,
            dispensed_quantity: x.dispensed_quantity,
            oil_type: x.oil_type,
            car_registration_number: x.car_registration_number,
            created_at: StatsDateTime(x.created_at)
          }))
        }
        for (let i = 0, l = data.length; i < l; i += 1) {
          if (!names.includes(data[i].oil_type))
            names.push(data[i].oil_type);
        }

        setDispenseData(data)
        return;
      });
  }, [dispatch]);

  const getFilteredTransactionDetails = (oilType: any[]) => {
    const filteredResults = dispenseData.filter(p => oilType.includes(p.oil_type));
    setDispenseData(filteredResults)
    return;
  }

  useEffect(() => {
    getTransactionDetails();
  }, [getTransactionDetails]);

  const classes = useStyles();

  const multipleSelection = (event: any) => {
    if (event.length === 1) {
      getFilteredTransactionDetails(event)
    } else {
      getTransactionDetails()
    }
  }

  const renderBody = () =>
    <div className={classes.root} style={{ width: "700px" }} >
      <div style={{ height: 280, width: '90%', marginLeft: '5%' }}>
        <DataGrid
          headerHeight={45}
          rowHeight={35}
          rows={dispenseData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick={true}
        />
      </div>
    </div>

  return (
    <TemplatePage showBackButton={true} backPath='/statistics/dispenses' showNextButton={false} handleBack={() => { }} title='Transactions'>
      <div className={styles.multiSelect}><MultipleSelect oilType="" handleSelection={multipleSelection} ></MultipleSelect></div>
      {renderBody()}
    </TemplatePage>
  );
}