import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
import { register, authorize, getContent } from '../../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { LoggedInContext } from '../contexts/LoggeInContext';
import { mainApi } from '../../utils/mainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import './App.css';
import { apiMovies } from '../../utils/apiMovies';

function App() {
  const location = useLocation();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const messageErr = "Что-то пошло не так! Попробуйте ещё раз.";
  const messageSucc = "Вы успешно зарегистрировались!";
  const [infoTooltipState, setInfoTooltipState] = useState({
    status: "",
    text: "",
    isOpen: false,
  });
  // const [rowCount, setRowCount] = useState(0);
  // const [countAdd, setCountAdd] = useState(0);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [moviesSavedForRender, setMoviesSavedForRender] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [ isAdded, setIsAdded] = useState(false);

  const foundedMovies = JSON.parse(localStorage.getItem('foundedMovies')) || [];

  const handleRegister = ({ name, email, password }) => {
    return register(name, email, password)
      .then((res) => {
        const data = res.data;
        setCurrentUser((prevState) => ({
          ...prevState,
          _id: res.data._id,
        }));
        console.log('user _id', currentUser._id)
        return data;
      })
      .then((data) => {
        if (data && data.email && data._id) {
          handleLogin({email: data.email, password})
        } 
      })
      .catch((err) => {
        setInfoTooltipState((prevState) => ({
          ...prevState,
          isOpen: true,
          text: messageErr,
          status: 'bad',
        }));
      });
  };

  const handleLogin = ({ email, password }) => {
    return authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          checkToken();
        }
      })
      .catch((err) => {
        setInfoTooltipState((prevState) => ({
          ...prevState,
          isOpen: true,
          text: messageErr,
          status: 'bad',
        }));
      });
  };

  const checkToken = () => {
    if (localStorage.getItem('jwt')) {
      getContent()
        .then((res) => {
          console.log('checkToken res', res)
          if (res.data && res.data.email) {  //should add _id
            setLoggedIn(true);
            setCurrentUser((prevState) => ({
              ...prevState,
              email: res.data.email,
              name: res.data.name,
              _id: res.data._id,
            }));
          } else {
            localStorage.removeItem('jwt')
          }
        })
        .then(() => {
          console.log('loggedIN',loggedIn)
          if (loggedIn) {
            history.push('/movies');
          }
          return
          
          //history.push('/movies');
        })
        .catch((err) => {
          setInfoTooltipState((prevState) => ({
            ...prevState,
            isOpen: true,
            text: messageErr,
            status: 'bad',
          }));
        });
    }
  };

  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('foundedMovies');
    localStorage.removeItem('wordForSearch');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('foundedFromSavedMovies');
    localStorage.removeItem('wordForSearchFromSavedMovies');
    localStorage.removeItem('movieCheckbox');
    localStorage.removeItem('savedMovieCheckbox');
    setLoggedIn(false);
    setCurrentUser((prevState) => ({
      ...prevState,
      name: '',
      email: '',
    }));
    
    history.push('/');
    console.log(localStorage.getItem(''))
  };

  const handleUpdateUser = ({ name, email}) => {
    mainApi
      .editProfile({name, email})
      .then((res) => {
        setCurrentUser((prevState) => ({
          ...prevState,
          name: res.name,
          email: res.email,
        }));
        setInfoTooltipState((prevState) => ({
          ...prevState,
          isOpen: true,
          text: messageSucc,
          status: "success",
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeInfoTooltip = () => {
    setInfoTooltipState((prevState) => ({
      ...prevState,
      isOpen: false,
      text: "",
      status: "",
    }));
  };

  const handleSearchMovies = async (wordForSearch) => {
    if (!JSON.parse(localStorage.getItem('initialMovies'))) {
      setIsLoading(true);
      await apiMovies
        .getInitialMovies()
        .then((res) => {
          if (res) {
            localStorage.setItem('initialMovies', JSON.stringify(res));
            setIsLoading(false);
          }
          console.log('useEffect InitialMovies', JSON.parse(localStorage.getItem('initialMovies')))
        })
        .catch(err => {
          console.log(err)
          console.log('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        })
    } else {}
    const movies = JSON.parse(localStorage.getItem('initialMovies'));
    const arr = movies.filter((item) => item.nameRU.toLowerCase().includes(wordForSearch));
    localStorage.setItem('wordForSearch', wordForSearch);
    console.log('foundedMovies', arr)
    checkboxFilter(arr)
  }

  const checkboxFilter = (arr) => {
    if (location.pathname === '/saved-movies') {
      const checkboxFilterStatusSavedMovies = JSON.parse(localStorage.getItem('movieSavedCheckbox'))
      console.log('checkbox', localStorage.getItem('wordForSearchFromSavedMovies'))
      if (checkboxFilterStatusSavedMovies) {
        const short = arr.filter((i) => (i.duration <= 40))
        console.log('short', short)
        localStorage.setItem('foundedFromSavedMovies', JSON.stringify(short)); 
        setMoviesSavedForRender(short)
      } else {
        console.log('arr', arr)
        localStorage.setItem('foundedFromSavedMovies', JSON.stringify(arr));
        setMoviesSavedForRender(arr)
      }
    } else {
      const checkboxFilterStatus = JSON.parse(localStorage.getItem('movieCheckbox'))
      if (checkboxFilterStatus) {
        const filteredFoundedMovies = arr.filter((i) => (i.duration <= 40))
        localStorage.setItem('foundedMovies', JSON.stringify(filteredFoundedMovies));
        firstMoviesCards(filteredFoundedMovies);
      } else {
        localStorage.setItem('foundedMovies', JSON.stringify(arr));
        firstMoviesCards(arr);
      }
    }
  }

  const handleSearchFromSavedMovies = (wordForSearch) => {
    localStorage.setItem('wordForSearchFromSavedMovies', wordForSearch);
    console.log('searh word ', localStorage.getItem('wordForSearchFromSavedMovies'))

    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const foundedFromSavedMovies = savedMovies.filter((item) => item.nameRU.toLowerCase().includes(wordForSearch));
    console.log('founded from saved movies', foundedFromSavedMovies)

    // localStorage.setItem('wordForSearchFromSavedMovies', wordForSearch);
    checkboxFilter(foundedFromSavedMovies);
  }

  let count
  const render = () => {
    if (document.documentElement.clientWidth < 800 && document.documentElement.clientWidth > 480) {
      count = 8
    } else if (480 >= document.documentElement.clientWidth && document.documentElement.clientWidth >= 320) {
      count = 5
    } else if (document.documentElement.clientWidth >= 800) {
      count = 12
    } else {}
    return count
  }

  let countToAdd
  const add = () => {
    if (800 > document.documentElement.clientWidth && document.documentElement.clientWidth > 480) {
      countToAdd =2
    } else if (480 >= document.documentElement.clientWidth && document.documentElement.clientWidth >= 320) {
      countToAdd = 5
    } else if (document.documentElement.clientWidth >= 800) {
      countToAdd = 3
    } else {}
  }
  
  function firstMoviesCards(arr) {  //initial here was var 'foundedMovies'
    render();
    console.log(count)
    setMoviesForRender(arr.slice(0, count));
  }

  function handleAddMoviesCards(x) {
    console.log('onClick', x)
    render();
    add();
    const foundedMovies = JSON.parse(localStorage.getItem('foundedMovies'));
    setMoviesForRender(foundedMovies.slice(0, count + x * countToAdd))
  }

  const handleMovieSave = ({isAdded, _id, nameRU, duration, image, trailerLink, country, director, year, description, thumbnail, movieId, nameEN }) => {
    const movieEl = {nameRU, duration, image, trailerLink, country, director, year, description, thumbnail, movieId, nameEN}

    mainApi
      .changeAddMovieStatus(movieEl, isAdded, _id)
      .then(res => {
        if (res) {
          mainApi
            .getMovies()
            .then(res => {
              if (res) {
                localStorage.setItem('savedMovies', JSON.stringify(res));
                setMoviesSavedForRender(res);
              }
            }) 
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }

  const handleMovieDelete = (id) => {
    mainApi
      .deleteMovie(id)
      .then(res => {
        if (res) {
          mainApi
            .getMovies()
            .then(res => {
              if (res) {
                localStorage.setItem('savedMovies', JSON.stringify(res));
                setMoviesSavedForRender(res)
              }
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      checkToken();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (location.pathname === '/movies') {
      firstMoviesCards(foundedMovies); 
    } else if (location.pathname === '/saved-movies') {
      setMoviesSavedForRender(JSON.parse(localStorage.getItem('savedMovies')))
    } 
  }, [])

  useEffect(() => {
    
  }, [moviesSavedForRender])

  //console.log('loggedIn', loggedIn)
  //console.log('isLoading', isLoading)

  return (

    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <LoggedInContext.Provider value={loggedIn}>
          <Switch>
          
            <Route exact path='/'>
              <Main />
            </Route>
            
            <ProtectedRoute
              path='/movies'
              loggedIn={loggedIn}
              component={Movies}
              handleSearchMovies={handleSearchMovies}
              handleAddMoviesCards={handleAddMoviesCards}
              foundedMovies={foundedMovies}
              moviesForRender={moviesForRender}
              isLoading={isLoading}
              handleMovieDelete={handleMovieDelete}
              handleMovieAdd={handleMovieSave}
            />
            <ProtectedRoute
              path='/saved-movies'
              loggedIn={loggedIn}
              component={SavedMovies}
              handleSearchMovies={handleSearchFromSavedMovies}
              moviesForRender={moviesSavedForRender}
              handleMovieDelete={handleMovieDelete}
              checkboxFilter={checkboxFilter}
            />
            <ProtectedRoute
              path='/profile'
              loggedIn={loggedIn}
              handleUpdateUser={handleUpdateUser}
              signOut={signOut}
              component={Profile}
            />
            <Route path='/signin'>
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path='/signup'>
              <Register handleRegister={handleRegister} />
            </Route>
            
            <Route path={'/movies' || '/saved-movies' || 'profile'} >
              {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
            </Route>

            <Route path='*'>
              <PageNotFound />
            </Route>

          </Switch>
          
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
      <InfoTooltip state={infoTooltipState} onClose={closeInfoTooltip} />
    </div>

  );
}

export default App;
