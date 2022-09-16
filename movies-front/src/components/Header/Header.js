import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import icon from '../../images/icon.svg';
import burger from '../../images/icon__burger.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useState } from 'react';

function Header(props) {
  const location = useLocation();

  const [menuActive, setMenuActive] = useState(false);

  return(
    <header className='header'>
      <Link to='/' className='header__link-to-main'>
        <img className='header__logo' src={logo} alt='Логотип' />
      </Link>
      {location.pathname === '/' && (
        <div className='header__container'>
          <Link
            to='/signup'
            className='header__link header__link_white'
          >
            Регистрация
          </Link>
          <button className='header__button'>
            <Link
              to='/signin'
              className=' header__link header__link_black'
            >
              Войти
            </Link>
          </button>
        </div>
      )}
      {(location.pathname === '/profile' || location.pathname === '/movies' || location.pathname === '/saved-movies')  && (
        <>
          <nav className='header__container header__container_nav'>
            <Link
              to='/movies'
              className='header__link header__link_white header__link_size'
            >
              Фильмы
            </Link>
            <Link
              to='/saved-movies'
              className='header__link header__link_white header__link_size'
            >
              Сохранённые фильмы
            </Link>
          </nav>
          <div className='header__container header__container_icon'>
            <Link
              to='/profile' 
              className='header__link header__link_to-profile'
            >
              Аккаунт
            </Link>
            <div className='header__icon'>
              <img src={icon} alt='Иконка' />
            </div>
          </div>

            <button className='burger-button' onClick={() => setMenuActive(!menuActive)}>
              <img src={burger} alt='кнопка меню'/>
              <img src={burger} alt='кнопка меню'/>
              <img src={burger} alt='кнопка меню'/>
            </button>

          <BurgerMenu active={menuActive} setActive={setMenuActive} />
        </>
      )}
    </header>
  );
}

export default Header;
