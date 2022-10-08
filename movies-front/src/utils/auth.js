const BASE_URL = `https://api.lovely.movies.nomoredomains.sbs`;

const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, email, password})
  })
  .then(checkResponse)
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem("jwt")
    }
  })
  .then(checkResponse)
}
