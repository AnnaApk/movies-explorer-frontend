import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({nameRU, duration, image, trailerLink}) {
  const location = useLocation();
  const [ isAdded, setIsAdded] = useState(false);

  const movieAddButtonClassName = (
    `movie__button ${isAdded ? 'movie__button_added' : ''}`
  );

  function handleAddClick() {
    setIsAdded(!isAdded);
  }

  return(
    <div className='movie'>
      <div className='movie__title-container'>
        <h2 className='movie__name'>{nameRU}</h2>
        <p className='movie__duration'>{duration} минут</p>
      </div>
      <a className='movie__trailerLink' href={trailerLink} target='_blank' >
        <img className='movie__poster' alt={nameRU} src={image} />
      </a>
      {location.pathname === '/movies' && (
        <button className={movieAddButtonClassName} type='button' onClick={handleAddClick}>Сохранить</button>
      )}
      {location.pathname === '/saved-movies' && (
        <button className='movie__button movie__button_delete' type='button' />
      )}
    </div>
  )
}

export default MoviesCard;
