import { useState } from 'react';
import './LoadMore.css';

function LoadMore({handleAddMoviesCards}) {
  const [onClick, setOnClick] = useState(1)   //should be 0

  const counter = (e) => {
    e.preventDefault();
    setOnClick(onClick + 1)
    handleAddMoviesCards(onClick)
  }

  return(
    <div className='load-more'>
      <button className='load-more__button' onClick={counter}>Ещё</button>
    </div>
  )
}

export default LoadMore;
