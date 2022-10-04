import { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from '../Header/Header';
import './Profile.css';

function Profile({handleUpdateUser, signOut}) {
  //console.log('profile props',handleUpdateUser, signOut )

  const currentUser = useContext(CurrentUserContext);

  //console.log('profile', currentUser)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Обязательное поле!').min(2, 'Слишком короткое имя').max(30, 'Слишком длинное имя'),
    email: Yup.string().email('Что-то пошло не так...').required('Обязательное поле!'),
  })

  const handleSubmitChange = async (data) => {
    const { name, email } = data;
    console.log('change', name, email)
    await handleUpdateUser({name, email});
  }

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  }

  return(
    <>
      <Header />
      <div className='profile'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <Formik
          initialValues={{
            name: currentUser.name,
            email: currentUser.email,
          }}
          validateOnBlur
          onSubmit={(values) => {handleSubmitChange(values)}}
          validationSchema={ validationSchema }
        >
          {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
            <form className='profile__form-container'>
              {touched.name && errors.name && <span className='error'>{errors.name}</span>}
              <div className='profile__form'>
                <label className='profile__form-label'>Имя</label>
                <input 
                  name='name'
                  className='profile__form-input'
                  type='text'
                  required
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label className='profile__form-label profile__form-label_align'>E-mail</label>
                <input 
                  name='email'
                  className='profile__form-input profile__form-label_align'
                  type='email'
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {touched.email && errors.email && <span className='error'>{errors.email}</span>}
              <button disabled={!isValid || !dirty} onClick={handleSubmit} type='submit' className='profile__form-button profile__form-button_white'>Редактировать</button>
              <button onClick={handleSignOut} type='submit' className='profile__form-button profile__form-button_pink'>Выйти из аккаунта</button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Profile;
