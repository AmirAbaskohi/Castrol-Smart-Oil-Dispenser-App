export const RemainingQty = (data: any) => {
  let remainingOilQty: any;

  let oilData = {
    oil_type: data.payload.oil_type,
    remaining_quantity: data.payload.remaining_quantity,
    remaining_quantity_perc: data.payload.remaining_quantity_perc ? data.payload.remaining_quantity_perc : 100
  }

  localStorage.setItem(data.payload.oil_type, JSON.stringify(oilData))
  remainingOilQty = data.payload.remaining_quantity.toFixed(2) + ' L (' + oilData.remaining_quantity_perc + '%)'
  return remainingOilQty;
}
