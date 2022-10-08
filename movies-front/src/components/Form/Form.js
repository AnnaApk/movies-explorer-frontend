import { Formik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import './Form.css';

function Form({handleRegister, handleLogin}) {
  const location = useLocation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Обязательное поле!').min(2, 'Слишком короткое имя').max(30, 'Слишком длинное имя'),
    email: Yup.string().email('Что-то пошло не так...').required('Обязательное поле!'),
    password: Yup.string().required('Обязательное поле!')
  })

  const validationSchemaAuth = Yup.object().shape({
    email: Yup.string().email('Что-то пошло не так...').required('Обязательное поле!'),
    password: Yup.string().required('Обязательное поле!')
  })

  const handleSubmitRegister = async (data) => {
    //console.log('formValues', data)
    const { name, email, password } = data;
    await handleRegister({ name, email, password });
  };

  const handleSubmitLogin = async (data) => {
    const { email, password } = data;
    await handleLogin({ email, password });
  };

  return(
    <Formik
      initialValues={{
        name:'',
        email:'',
        password:''
      }}
      validateOnBlur
      onSubmit={(values) => {
        if (location.pathname === '/signup') {
          handleSubmitRegister(values)
        } else {
          handleSubmitLogin(values)
        } 
      }}
      validationSchema={location.pathname === '/signup' ? validationSchema : validationSchemaAuth}
    >
      {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
        <form className='form'>
          {location.pathname === '/signup' && (
            <>
              <label className='form__label'>Имя</label>
              <input 
                name='name'
                className='form__input'
                type='text'
                required
                value={values.name}
                onChange={handleChange } 
                onBlur={handleBlur}
                id='name-input'
              />
              {touched.name && errors.name && <span className='error'>{errors.name}</span>}
            </>
          )}
          <label className='form__label'>E-mail</label>
          <input 
            name='email'
            className='form__input'
            type='email'
            required
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id='email-input'
          />
          {touched.email && errors.email && <span className='error'>{errors.email}</span>}
          <label className='form__label'>Пароль</label>
          <input
            name='password'
            className='form__input'
            type='password'
            required
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id='password-input'
          />
          {touched.password && errors.password && <span className='error'>{errors.password}</span>}
          {location.pathname === '/signup' && (
            <button
              disabled={!isValid || !dirty}
              onClick={handleSubmit}  
              className='form__button form__button_signup'
              type='submit'
            >
              Зарегистрироваться
            </button>
          )}
          {location.pathname === '/signin' && (
            <button
              disabled={!isValid || !dirty}
              onClick={handleSubmit}  
              className='form__button form__button_signin'
              type='submit'
            >
              Войти
            </button>
          )}
        </form>
      )}
    </Formik>
  );
}

export default Form;
