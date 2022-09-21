import { useState } from 'react';
import Header from '../Header/Header';
import './Profile.css';

function Profile(props) {

  const [formParametrs, sertFormParametrs] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    sertFormParametrs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return(
    <>
      <Header />
      <div className='profile'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form className='profile__form-container'>
          <div className='profile__form'>
            <label className='profile__form-label'>Имя</label>
            <input 
              name='name'
              className='profile__form-input'
              type='text'
              required
              value={formParametrs.name}
              onChange={handleChange}
            />
            <label className='profile__form-label profile__form-label_align'>E-mail</label>
            <input 
              name='email'
              className='profile__form-input profile__form-label_align'
              type='email'
              required
              value={formParametrs.email}
              onChange={handleChange}
            />
          </div>
          <button className='profile__form-button profile__form-button_white'>Редактировать</button>
          <button className='profile__form-button profile__form-button_pink'>Выйти из аккаунта</button>
        </form>
      </div>
    </>
  );
}

export default Profile;
