import fetch from 'node-fetch';

export const fetchStatsDispensesTransaction = async (userId: any) => {
  let transactionData: any;

  try {
    await fetch(`http://${window.location.hostname}:8000/dispenses/${userId}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => { transactionData = data })
  } catch (error) {
    console.log(error);
  }

  return transactionData;
}

export const fetchStatsOrderTransaction = async (userId: any) => {
  let transactionOrderData: any;

  try {
    await fetch(`http://${window.location.hostname}:8000/orders/${userId}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => { transactionOrderData = data })
  } catch (error) {
    console.log(error);
  }

  return transactionOrderData;
}

export const fetchEnvironmentalBenefits = async (userId: any) => {
  let environmentalBenefits: any;

  try {
    await fetch(`http://${window.location.hostname}:8000/environmental-benefits/${userId}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => { environmentalBenefits = data })
  } catch (error) {
    console.log(error);
  }

  return environmentalBenefits;
}