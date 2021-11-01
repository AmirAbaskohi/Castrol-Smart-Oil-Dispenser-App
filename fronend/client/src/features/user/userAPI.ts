import fetch from 'node-fetch';

export const fetchUser = async (user: any) => {
  const userDetails = user;

  const body: any = {
    name: userDetails.user.name,
    password: userDetails.user.password,
    rfid_tag: userDetails.user.rfid_tag
  };

  const response = await fetch(`http://${window.location.hostname}:8000/userInfo/`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })

  if (response.status !== 200) throw new Error('Request failed.');
  return await response.json();
}