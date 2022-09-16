import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import LoadMore from '../LoadMore/LoadMore';
import './MoviesCardList.css';
import Movies from '../../InitialMoviesList/InitialMoviesList';


function MoviesCardList(props) {
  return(
    <>
      <Preloader/>
      <section className='elements'>
       {Movies.map((el) => (
          <MoviesCard {...el} key={el._id} />
        ))}
      </section>
      { Movies.length >= 12 && <LoadMore /> }
    </>
  )
}

export default MoviesCardList;
