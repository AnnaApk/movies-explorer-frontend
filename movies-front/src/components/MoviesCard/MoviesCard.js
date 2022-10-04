import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({handleMovieDelete, handleMovieAdd, nameRU, duration, image, trailerLink, country, director, year, description, id, nameEN, movieId}) { // _id
  const location = useLocation();
  //const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
  
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
  const [ isAdded, setIsAdded ] = useState(savedMovies.some(i => (i.movieId === id)));

  const movieAddButtonClassName = (`movie__button ${isAdded ? 'movie__button_added' : ''}`);

  const toggleStatus = () => {
    return setIsAdded(prev => !prev);
  }

  async function handleSaveClick() {
    let _id;
    const savedMoviesNew = JSON.parse(localStorage.getItem('savedMovies')) || [];

    if (isAdded) {
      _id = savedMoviesNew.find(i => (i.movieId === id))._id;
    } else {
      _id = '';
    }

    await handleMovieAdd({
      isAdded,
      _id,
      nameRU,
      duration,
      image: `${ `https://api.nomoreparties.co/.` + image.url}`,
      trailerLink,
      country,
      director,
      year,
      description,
      thumbnail: `${ `https://api.nomoreparties.co/.` + image.formats.thumbnail.url}`,
      movieId: id,
      nameEN,
    });
    toggleStatus(isAdded); 
  }

  async function handleDeleteClick() {

    const ID = savedMovies.find(i => (i.movieId === movieId))._id;
    await handleMovieDelete(ID);
    
  }

  useEffect(() => {
    
  }, [] )

  return(
    <div className='movie'>
      <div className='movie__title-container'>
        <h2 className='movie__name'>{nameRU}</h2>
        <p className='movie__duration'>{duration} минут</p>
      </div>
      {location.pathname === '/movies' && (
        <>
          <a className='movie__trailerLink' href={trailerLink} target='_blank' rel='noreferrer'>
            <img className='movie__poster' alt={nameRU} src={`${ `https://api.nomoreparties.co/.` + image.url}`} />
          </a>
          <button className={movieAddButtonClassName} type='button' onClick={handleSaveClick}>Сохранить</button>
        </>
      )}
      {location.pathname === '/saved-movies' && (
        <>
          <a className='movie__trailerLink' href={trailerLink} target='_blank' rel='noreferrer'>
            <img className='movie__poster' alt={nameRU} src={image} />
          </a>
          <button className='movie__button movie__button_delete' type='button' onClick={handleDeleteClick} />
        </>
      )}
    </div>
  )
}

export default MoviesCard;
