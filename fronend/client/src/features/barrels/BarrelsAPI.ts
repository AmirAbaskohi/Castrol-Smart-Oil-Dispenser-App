import fetch from 'node-fetch';

export const fetchBarrels = async () => {
  let barrelData: any;

  try {
    await fetch(`http://${window.location.hostname}:8000/barrel/`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => { barrelData = data })

  } catch (error) {
    console.log(error);
  }

  const barreldata = barrelData.map((barreldetail: any) => ({ id: barreldetail.barrel_type_id, ...barreldetail }))
  return barreldata;
}

export const barrelResetLevel = async (id: any) => {
  let barrellevel: any;

  try {
    await fetch(`http://${window.location.hostname}:8000/barrel/${id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => { barrellevel = data })
  } catch (error) {
    console.log(error);
  }

  return { ...barrellevel, totalVolume: barrellevel.remaining_quantity }
}

export const getBarrelTypes = async () => {
  let barrelTypesData: any;

  try {
    await fetch(`http://${window.location.hostname}:8000/barreltypes/`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => { barrelTypesData = data })

  } catch (error) {
    console.log(error);
  }

  return barrelTypesData;
}

export const getBarrelOilTypes = async () => {
  let oilTypesData: any;

  try {
    await fetch(`http://${window.location.hostname}:8000/oilTypes/`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => { oilTypesData = data })

  } catch (error) {
    console.log(error);
  }

  return oilTypesData;
}

export const orderBarrel = async (barrelPayload: any) => {
  let barrelData: any;

  const body: any = {
    barrel_type_id: barrelPayload.selectedBarrelId,
    oil_type: barrelPayload.selectedOilType,
    user_id: barrelPayload.userId
  };

  try {
    await fetch(`http://${window.location.hostname}:8000/order/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => { barrelData = res.status })
  } catch (error) {
    console.log(error);
  }

  return barrelData;
}