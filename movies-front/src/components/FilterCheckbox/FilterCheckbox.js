import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css';

function FilterCheckbox({ handleSearchMovies, wordForSearch }) { //handleCheckboxClick
  const location = useLocation();
  const [isMoviesFilterCheckboxOn, setIsMoviesFilterCheckboxOn] = useState(false);
  const [isSavedMoviesFilterCheckboxOn, setIsSavedMoviesFilterCheckboxOn] = useState(false);
  const checkboxStatus = (location.pathname === '/movies' && JSON.parse(localStorage.getItem('movieCheckbox'))) || (location.pathname === '/saved-movies' && JSON.parse(localStorage.getItem('movieSavedCheckbox')));
  const classNameSpan = checkboxStatus ? 'checkbox__span checkbox__span_activ' : 'checkbox__span'
  const classNameDot = checkboxStatus ? 'checkbox__dot checkbox__dot_activ' : 'checkbox__dot'

  const toggleCheckBoxFilter = () => {
    if (location.pathname === '/movies') {
      setIsMoviesFilterCheckboxOn(prev => !prev);
      localStorage.setItem('movieCheckbox', JSON.stringify(isMoviesFilterCheckboxOn));
      handleSearchMovies(wordForSearch); //localStorage.getItem('wordForSearch')
    } else {
      setIsSavedMoviesFilterCheckboxOn(prev => !prev);
      localStorage.setItem('movieSavedCheckbox', JSON.stringify(isSavedMoviesFilterCheckboxOn));
      handleSearchMovies(wordForSearch);  //localStorage.getItem('wordForSearchFromSavedMovies')
    }
  }

  //console.log('dfasdgas-2', localStorage.getItem('movieCheckbox'), isMoviesFilterCheckboxOn)
  //console.log('dfasdgas-2', localStorage.getItem('movieSavedCheckbox'), ) //isSavedMoviesFilterCheckboxOn

  return(
      <label className='checkbox' >
        <input className='checkbox__input' type='checkbox' onClick={toggleCheckBoxFilter}></input>
        <span className={classNameSpan} > <div className={classNameDot}></div></span>
        Короткометражки
      </label>
  );
}

export default FilterCheckbox;
