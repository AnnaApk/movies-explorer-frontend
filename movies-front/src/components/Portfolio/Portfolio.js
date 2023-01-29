import './Portfolio.css';

function Portfolio(props) {
  return(
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/AnnaApk/react-mesto-api-full' target='_blank' rel='noreferrer'>
            <h3 className='portfolio__skill-link'>Статичный сайт</h3>
            <p className='portfolio__skill-link'>↗</p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/AnnaApk/react-mesto-api-full' target='_blank' rel='noreferrer'>
            <h3 className='portfolio__skill-link'>Адаптивный сайт</h3>
            <p className='portfolio__skill-link'>↗</p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/AnnaApk/react-mesto-api-full' target='_blank' rel='noreferrer'>
            <h3 className='portfolio__skill-link'>Одностраничное приложение</h3>
            <p className='portfolio__skill-link'>↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
