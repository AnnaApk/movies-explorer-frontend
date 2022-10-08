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
import useWindowSize from '../useWindowSize/useWindowSize';
import Preloader from '../Preloader/Preloader';

function App() {
  const location = useLocation();
  const windowSize = useWindowSize();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const messageErr = "Что-то пошло не так! Попробуйте ещё раз.";
  const messageSucc = "Ваши данные изменены!";
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
  const [isCheckedToken, setIsCheckedToken] = useState(false);

  const foundedMovies = JSON.parse(localStorage.getItem('foundedMovies')) || [];

  const handleRegister = ({ name, email, password }) => {
    return register(name, email, password)
      .then((res) => {
        const data = res.data;
        setCurrentUser((prevState) => ({
          ...prevState,
          _id: res.data._id,
        }));
        //console.log('user _id', currentUser._id)
        return data;
      })
      .then((data) => {
        if (data && data.email && data._id) {
          handleLogin({email: data.email, password})
        } 
      })
      .catch((err) => {
        setIsCheckedToken(true)
        console.log('err', err)
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
      .then(() => {                  //////////////////////////////
        if (loggedIn) {
          history.push('/movies');
        }
        return
      })
      .catch((err) => {
        setIsCheckedToken(true);
        setInfoTooltipState((prevState) => ({
          ...prevState,
          isOpen: true,
          text: messageErr,
          status: 'bad',
        }));
      });
  };

  const checkToken = () => {
    console.log('checkToken isCheckTokenReading', isCheckedToken);
    if (localStorage.getItem('jwt')) {
      getContent()
        .then((res) => {
          if (res.data && res.data.email) {
            setLoggedIn(true);
            setIsCheckedToken(true);
            setCurrentUser((prevState) => ({
              ...prevState,
              email: res.data.email,
              name: res.data.name,
              _id: res.data._id,
            }));
          } else {
            setIsCheckedToken(true);
            signOut();
          }
        })
        .then(() => {
          console.log('loggedIN',loggedIn);
          // if (loggedIn) {        ////redirect in login function
          //   history.push('/movies');
          // }
          // return
        })
        .catch((err) => {
          setIsCheckedToken(true);
          signOut();
          // setInfoTooltipState((prevState) => ({
          //   ...prevState,
          //   isOpen: true,
          //   text: messageErr,
          //   status: 'bad',
          // }));
        });
    } else {
      setIsCheckedToken(true)
      signOut();
    };
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
    localStorage.removeItem('movieSavedCheckbox');
    localStorage.removeItem('savedMovieCheckbox');
    setMoviesForRender([]);
    setMoviesSavedForRender([]);
    setLoggedIn(false);
    // setIsCheckedToken(false);
    setCurrentUser((prevState) => ({
      ...prevState,
      name: '',
      email: '',
    }));
    
    history.push('/');
    //console.log(localStorage.getItem(''))
  };

  const handleUpdateUser = ({ name, email}) => {
    checkToken();
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
        setInfoTooltipState((prevState) => ({
          ...prevState,
          isOpen: true,
          text: messageErr,
          status: "bad",
        }));
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
    checkToken();
    if (!JSON.parse(localStorage.getItem('initialMovies'))) {
      setIsLoading(true);
      await apiMovies
        .getInitialMovies()
        .then((res) => {
          if (res) {
            localStorage.setItem('initialMovies', JSON.stringify(res));
            setIsLoading(false);
          }
          //console.log('useEffect InitialMovies', JSON.parse(localStorage.getItem('initialMovies')))
        })
        .catch(err => {
          //console.log(err)
          //console.log('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        })
    } else {}
    const movies = JSON.parse(localStorage.getItem('initialMovies'));
    const arr = movies.filter((item) => item.nameRU.toLowerCase().includes(wordForSearch));
    localStorage.setItem('wordForSearch', wordForSearch);
    //console.log('foundedMovies', arr)
    checkboxFilter(arr)
  }

  //const [isMoviesFilterCheckboxOn, setIsMoviesFilterCheckboxOn] = useState(false);
  //const [isSavedMoviesFilterCheckboxOn, setIsSavedMoviesFilterCheckboxOn] = useState(false);

  // const toggleCheckBoxFilter = () => {
  //   if (location.pathname === '/movies') {
  //     setIsMoviesFilterCheckboxOn(prev => !prev);
  //     localStorage.setItem('movieCheckbox', JSON.stringify(isMoviesFilterCheckboxOn));
  //     handleSearchMovies(localStorage.getItem('wordForSearch'));                              //here can be problem
  //   } else {
  //     setIsSavedMoviesFilterCheckboxOn(prev => !prev);
  //     localStorage.setItem('movieSavedCheckbox', JSON.stringify(isSavedMoviesFilterCheckboxOn));
  //     handleSearchFromSavedMovies(localStorage.getItem('wordForSearchFromSavedMovies'));      
  //   }
  // }


  const checkboxFilter = (arr) => {
    if (location.pathname === '/saved-movies') {
      const checkboxFilterStatusSavedMovies = JSON.parse(localStorage.getItem('movieSavedCheckbox'))
      //console.log('checkbox', localStorage.getItem('wordForSearchFromSavedMovies'))
      if (checkboxFilterStatusSavedMovies) {
        const short = arr.filter((i) => (i.duration <= 40))
        //console.log('short', short)
        localStorage.setItem('foundedFromSavedMovies', JSON.stringify(short)); 
        setMoviesSavedForRender(short)
      } else {
        //console.log('arr', arr)
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
    checkToken();
    localStorage.setItem('wordForSearchFromSavedMovies', wordForSearch);
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const foundedFromSavedMovies = savedMovies.filter((item) => item.nameRU.toLowerCase().includes(wordForSearch));
    //console.log('founded from saved movies', foundedFromSavedMovies)
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
  
  const firstMoviesCards = (arr) => {  //initial here was var 'foundedMovies'
    render();
    //console.log(count)
    setMoviesForRender(arr.slice(0, count));
  }

  function handleAddMoviesCards(x) {
    //console.log('onClick', x)
    checkToken();
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
      .catch(err => {
        signOut()
        console.log('err', JSON.parse(err))
        if (err === 401) {
          signOut();
        } else {}
      })
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
      .catch(err => {
        signOut();
        if (err === 401) {
          signOut();
        } else {}
      })
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (location.pathname === '/movies') {
      firstMoviesCards(foundedMovies); 
    } else if (location.pathname === '/saved-movies') {
      setMoviesSavedForRender(JSON.parse(localStorage.getItem('savedMovies')))
    } else {}
  }, [])

  useEffect(() => {
    if (loggedIn) {
      checkToken();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getMovies()
      .then((res) => {
        if (res) {
          localStorage.setItem('savedMovies', JSON.stringify(res));
          setMoviesSavedForRender(res);
        }
      })
      .catch(err => console.log(err))
    } else {}  
  }, [loggedIn]);

  useEffect(() => {}, [moviesSavedForRender])
  useEffect(() => {}, [isCheckedToken])

  useEffect(() => {
    if (location.pathname === '/movies') {
      firstMoviesCards(JSON.parse(localStorage.getItem('foundedMovies')))
    } else {}
  }, [windowSize])

  return (
    <div className='app'>
 
      {/* <CurrentUserContext.Provider value={currentUser}>
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

              // handleCheckboxClick={toggleCheckBoxFilter}
            />
            <ProtectedRoute
              path='/saved-movies'
              loggedIn={loggedIn}
              component={SavedMovies}
              handleSearchMovies={handleSearchFromSavedMovies}
              moviesForRender={moviesSavedForRender}
              handleMovieDelete={handleMovieDelete}
              checkboxFilter={checkboxFilter}

              // handleCheckboxClick={toggleCheckBoxFilter}
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
            
            <Route path={'/movies'} >
              {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
            </Route>
            <Route path={'/saved-movies'} >
              { !isCheckedToken ? <Preloader /> : (loggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/" />)}
            </Route>
            <Route path={'/profile'} >
              {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
            </Route>
            <Route path={'/signin'} >
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
            <Route path={'/signup'} >
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
            </Route>

            <Route path='*'>
              <PageNotFound />
            </Route>

          </Switch>
          
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
      <InfoTooltip state={infoTooltipState} onClose={closeInfoTooltip} /> */}
      

      { !isCheckedToken ? <Preloader /> : <>
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

              // handleCheckboxClick={toggleCheckBoxFilter}
            />
            <ProtectedRoute
              path='/saved-movies'
              loggedIn={loggedIn}
              component={SavedMovies}
              handleSearchMovies={handleSearchFromSavedMovies}
              moviesForRender={moviesSavedForRender}
              handleMovieDelete={handleMovieDelete}
              checkboxFilter={checkboxFilter}

              // handleCheckboxClick={toggleCheckBoxFilter}
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
            
            <Route path={'/movies'} >
              {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
            </Route>
            <Route path={'/saved-movies'} >
              {loggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/" />}
            </Route>
            <Route path={'/profile'} >
              {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
            </Route>
            <Route path={'/signin'} >
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
            <Route path={'/signup'} >
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
            </Route>
            

            <Route path='*'>
              <PageNotFound />
            </Route>

          </Switch>
          
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
      <InfoTooltip state={infoTooltipState} onClose={closeInfoTooltip} />
      </>}
      
    </div>

  );
}

export default App;
