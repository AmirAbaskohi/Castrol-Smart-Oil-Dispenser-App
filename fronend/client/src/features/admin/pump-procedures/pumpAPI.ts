import fetch from 'node-fetch';
import { ProcedureType, ActionType } from './enums';

export const controlPump = async (pumpId: number, procedure: ProcedureType, action: ActionType) => {
  try {
    const body = {
      pumpId,
      procedure,
      action,
    };

    await fetch(`http://${window.location.hostname}:8000/api/pump/procedure`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => console.log(json));

  } catch (error) {
    console.log(error);
    // TODO: need a proper way to log the error and trow some error message to frontend
  }
}