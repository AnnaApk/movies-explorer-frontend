import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './Search.css';

function Search(props) {
  const [formParametrs, sertFormParametrs] = useState({
    film: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    sertFormParametrs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return(
    <section className='search'>
      <form className='search__form'>
        <input 
        name='film'
        className='search__input'
        type='text'
        placeholder='Фильм'
        required
        value={formParametrs.film}
        onChange={handleChange}
        />
        <button className='search__button'>Поиск</button>
      </form>
      <FilterCheckbox />
    </section>
  );
}
export default Search;
