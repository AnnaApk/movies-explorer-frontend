class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
       return Promise.reject(`${res.status}`);
    }
    return res.json();
} 

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
    .then(this._getResponseData)
  }

  editProfile({name, email}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email
      })
    })
    .then(this._getResponseData)
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
    .then(this._getResponseData)
  }

  addMovie({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN}) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN
      })
    })
    .then(this._getResponseData)
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      },
    })
    .then(this._getResponseData)
  }

  changeAddMovieStatus(movieEl, isAdded, _id) {
    if (isAdded) {
      console.log('API delete', _id)
      return this.deleteMovie(_id);
    } else {
      console.log('API add', movieEl)
      return this.addMovie(movieEl);
    }
  }
}

const baseUrl = `https://api.lovely.movies.nomoredomains.sbs`;

export const mainApi = new Api({
  baseUrl: baseUrl
})
