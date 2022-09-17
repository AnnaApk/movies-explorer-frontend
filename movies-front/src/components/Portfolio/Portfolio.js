import './Portfolio.css';

function Portfolio(props) {
  return(
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <div className='portfolio__item'>
        <h3 className='portfolio__skill'>Статичный сайт</h3>
        <a className='portfolio__link' href='https://github.com/AnnaApk/react-mesto-api-full' target='_blank' rel='noreferrer'>↗</a>
      </div>
      <div className='portfolio__item'>
        <h3 className='portfolio__skill'>Адаптивный сайт</h3>
        <a className='portfolio__link' href='https://github.com/AnnaApk/react-mesto-api-full' target='_blank' rel='noreferrer'>↗</a>
      </div>
      <div className='portfolio__item'>
        <h3 className='portfolio__skill'>Одностраничное приложение</h3>
        <a className='portfolio__link' href='https://github.com/AnnaApk/react-mesto-api-full' target='_blank' rel='noreferrer'>↗</a>
      </div>
    </section>
  );
}

export default Portfolio;
