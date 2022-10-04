class MoviesApi {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }
  
  getInitialMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
     return res.json();
    })
  }
}

export const apiMovies = new MoviesApi({
  baseUrl: `https://api.nomoreparties.co/beatfilm-movies`
})
