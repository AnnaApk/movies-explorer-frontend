import './FilterCheckbox.css';

function FilterCheckbox(props) {

  return(
      <label className='checkbox'>
        <input className='checkbox__input' type='checkbox'></input>
        <span className='checkbox__span'></span>
        Короткометражки
      </label>
  );
}

export default FilterCheckbox;
