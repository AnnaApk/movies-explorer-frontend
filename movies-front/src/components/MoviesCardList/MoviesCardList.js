//import { useEffect, useLayoutEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import LoadMore from '../LoadMore/LoadMore';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function MoviesCardList({ movies, moviesForRender, handleAddMoviesCards, handleMovieDelete, handleMovieAdd}) {
  const location = useLocation();
  const initialFrase = () => {
    let word;
    if (location.pathname === '/movies') {
      word = localStorage.getItem('wordForSearch')
    } else if (location.pathname === '/saved-movies') {
      word = localStorage.getItem('wordForSearchFromSavedMovies')
    } 
    return word
  }
  // const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  // const searchMovies = JSON.parse(localStorage.getItem('foundedFromSavedMovies'));
  // const arr = !searchMovies ? searchMovies : savedMovies;
 //const arr = moviesForRender || savedMovies
  
// console.log('saved movies', savedMovies)
//   //console.log('arr', arr)
//   console.log('movies', moviesForRender)

  useEffect(() => {}, [moviesForRender])

  


  // useEffect(()=> {
  //   setArray(JSON.parse(localStorage.getItem('savedMovies')))
  // }, [])

  return(
    <>
      {location.pathname === '/movies' && <>
      { movies.length === 0 && initialFrase() && <p>Ничего не найдено</p> }
      <section className='elements'>
        {moviesForRender.map((el) => (
          <MoviesCard {...el} key={el.id} handleMovieDelete={handleMovieDelete} handleMovieAdd={handleMovieAdd} />
        ))}
      </section>
      { movies.length > moviesForRender.length && <LoadMore  handleAddMoviesCards={handleAddMoviesCards} /> }
      </>
      }
      {location.pathname === '/saved-movies' && <>
      {moviesForRender.length === 0 ? <p>Ничего не найдено</p> : <section className='elements'>
          {moviesForRender.map((el) => (
            <MoviesCard {...el} key={el._id} handleMovieDelete={handleMovieDelete} />
          ))}
        </section>}
        {/* <section className='elements'>
          {moviesForRender.map((el) => (
            <MoviesCard {...el} key={el._id} handleMovieDelete={handleMovieDelete} />
          ))}
        </section> */}
      </>
      }
      
    </>
  )
}

export default MoviesCardList;
