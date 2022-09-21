import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';
import Form from '../Form/Form';

function Login(props) {

  return(
    <div className='login'>
      <header className='login__header'>
      <Link to='/' className='login__link'>
        <img src={logo} alt='Логотип' />
      </Link>
        <h2 className='login__title'>Рады видеть!</h2>
      </header>
      <Form />
      <div className='login__footer'>
          <p className='login__footer-text'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='login__link login__link-to-signup'>
            Регистрация
          </Link>
      </div>
    </div>
  );
}

export default Login
