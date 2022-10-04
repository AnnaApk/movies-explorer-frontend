import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';
import { useEffect } from 'react';
import { mainApi } from '../../utils/mainApi';

function SavedMovies({handleSearchMovies, moviesForRender, handleMovieDelete, checkboxFilter}) {
  
  console.log('moviesForRender in saved-Movies', moviesForRender)

 
  

  useEffect(() => {
    mainApi.getMovies()
      .then((res) => {
        if (res) {
          localStorage.setItem('savedMovies', JSON.stringify(res));
        }
      })
      .catch(err => console.log(err))
  }, []);



  return(
    <>
      <Header />
      <main className='main'>
        <Search handleSearchMovies={handleSearchMovies} checkboxFilter={checkboxFilter} />
        <MoviesCardList moviesForRender={moviesForRender} handleMovieDelete={handleMovieDelete} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;
