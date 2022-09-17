import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies(props) {
  return(
    <>
      <Header />
      <main className='main'>
        <Search />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  )
}

export default Movies;
