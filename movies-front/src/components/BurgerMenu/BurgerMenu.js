import { Link } from 'react-router-dom';
import './BurgerMenu.css';
import icon from '../../images/icon.svg';

function BurgerMenu({active, setActive}) {
  return(
    <div className={active ? 'menu menu_active' : 'menu'}>
      <div className='blur'>
        <div className='menu__container'>
          <button className='menu__close' onClick={() => setActive(!active)}></button>
          <ul className='menu__content'>
            <li>
              <Link className='menu__link' to='/' >Главная</Link>
            </li>
            <li>
              <Link className='menu__link' to='/movies'>Фильмы</Link>
            </li>
            <li>
              <Link className='menu__link' to='/saved-movies'>Сохранённые фильмы</Link>
            </li>
          </ul>
          <div className='menu__container_icon'>
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
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu;
