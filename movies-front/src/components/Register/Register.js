import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import './Register.css';
import logo from '../../images/logo.svg';

function Register({handleRegister}) {

  return(
    <div className='register'>
      <header className='register__header'>
        <Link to='/' className='register__link'>
          <img src={logo} alt='Логотип' />
        </Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
      </header>
      <Form handleRegister={handleRegister} />
      <div className='register__footer'>
        <p className='register__footer-text'>Уже зарегистрированны?</p>
        <Link to='/signin' className='register__link register__link-to-signin'>
          Войти
        </Link>
       </div>
    </div>
  );
}

export default Register;
