import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState, useCallback } from "react";

import { TemplatePage } from '../../TemplatePage/TemplatePage';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { statsOrderTransactions } from '../StatisticsTransactionSlice';
import { StatsDateTime } from '../StatsDateTime';
import { UserAuth } from '../../../types';
import { userAuthState } from '../../user/userSlice';

const columns: GridColDef[] = [
  {
    field: 'total_volume',
    headerName: 'Qty (L)',
    headerClassName: 'gridHeader',
    cellClassName: 'gridCell',
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    width: 150
  },
  {
    field: 'oil_type',
    headerName: 'Oil Type',
    headerClassName: 'gridHeader',
    cellClassName: 'gridCell',
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    width: 250
  },
  {
    field: 'created_at',
    headerName: 'Date',
    headerClassName: 'gridHeader',
    width: 210,
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
      wordWrap: "break-word"
    }
  },
});

export const StatisticsOrderTransactions = () => {
  const userStore = useAppSelector(userAuthState) as UserAuth;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<any[]>([])

  const getTransactionDetails = useCallback(() => {
    let data: any;
    dispatch(statsOrderTransactions(userStore.id))
      .then(transactionData => {
        if (transactionData.payload) {
          const receivedData = transactionData.payload || [];
          const sortedData = receivedData.sort((a: any, b: any) => a.created_at >= b.created_at ? -1 : 1);

          data = sortedData.map((x: any) => ({
            id: x.id,
            total_volume: x.total_volume,
            oil_type: x.oil_type,
            name: x.name,
            created_at: StatsDateTime(x.created_at)
          }))
        }
        setOrders(data)
        return;
      })
  }, [dispatch, userStore])

  useEffect(() => {
    getTransactionDetails()
  }, [getTransactionDetails])

  const renderBody = () =>
    <div className={classes.root} style={{ width: "700px" }} >
      <div style={{ height: 310, width: '90%', marginLeft: '5%' }}>
        <DataGrid
          headerHeight={45}
          rowHeight={35}
          rows={orders}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          disableSelectionOnClick={true}
        />
      </div>
    </div>

  return (
    <TemplatePage showBackButton={true} backPath='/statistics/orders' showNextButton={false} handleBack={() => { }} title='Transactions'>
      {renderBody()}
    </TemplatePage>
  );
}