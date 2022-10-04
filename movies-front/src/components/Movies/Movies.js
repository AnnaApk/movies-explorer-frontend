import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';
import Preloader from '../Preloader/Preloader';

function Movies({handleSearchMovies, handleAddMoviesCards, foundedMovies, moviesForRender, isLoading, handleMovieDelete, handleMovieAdd, handleFilterCheckboxClick}) {

  //console.log('moviesForRender in Movies', moviesForRender)

  return(
    <>
      <Header />
      <main className='main'>
        <Search handleSearchMovies={handleSearchMovies} handleFilterCheckboxClick={handleFilterCheckboxClick} />
        { isLoading ? <Preloader /> : <MoviesCardList movies={foundedMovies} moviesForRender={moviesForRender} handleAddMoviesCards={handleAddMoviesCards} handleMovieDelete={handleMovieDelete} handleMovieAdd={handleMovieAdd} /> }
      </main>
      <Footer />
    </>
  )
}

export default Movies;
