export const BASE_URL = 'http://api.expressmesto.students.nomoredomains.xyz';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`); 
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({password, email})
  })
  .then((res) => checkResponse(res))
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({password, email})
  })
  .then((res) => checkResponse(res))
  .then((data) => {
    if (data.token){
      console.log(data);
      localStorage.setItem('jwt', data.token);
      return data;
    } 
  })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: "include",
  })
  .then((res) => checkResponse(res))
}
