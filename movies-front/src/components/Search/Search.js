import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './Search.css';

function Search({ handleSearchMovies, checkboxFilter, handleCheckboxClick }) {
  const location = useLocation();
  const initialFrase = () => {
    let word;
    if (location.pathname === '/movies') {
      word = localStorage.getItem('wordForSearch') || '';
    } else if (location.pathname === '/saved-movies') {
      word =  ''; //localStorage.getItem('wordForSearchFromSavedMovies') ||
    } 
    return word
  }
  const [wordForSearch, setWordForSearch] = useState({film: initialFrase()} || {film: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWordForSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === '/saved-movies' && wordForSearch === '') {
      checkboxFilter(localStorage.getItem('savedMovies'));
    } else {
      handleSearchMovies(wordForSearch.film.toLowerCase());
    }
  }

  return(
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmit}>
        {location.pathname === '/movies' ? <input 
        name='film'
        className='search__input'
        type='text'
        placeholder='Фильм'
        required
        value={wordForSearch.film}
        onChange={handleChange}
        /> : <input 
        name='film'
        className='search__input'
        type='text'
        placeholder='Фильм'
        value={wordForSearch.film}
        onChange={handleChange}
        />
        }
        {/* <input 
         name='film'
         className='search__input'
         type='text'
         placeholder='Фильм'
         required
         value={wordForSearch.film}
         onChange={handleChange}
         /> */}
        <button className='search__button' type='submit'>Поиск</button>
      </form>
      <FilterCheckbox handleSearchMovies={handleSearchMovies} wordForSearch={wordForSearch.film} handleCheckboxClick={handleCheckboxClick} />
    </section>
  );
}
export default Search;
