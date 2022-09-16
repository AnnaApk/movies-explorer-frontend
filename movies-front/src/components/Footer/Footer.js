import './Footer.css';

function Footer(props) {
  return(
    <footer className='footer'>
      <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className='footer__container'>
        <p className='footer__text footer__text_gray'>&copy; 2022</p>
        <div className='footer__container footer_reverce'>
          <p className='footer__text'>Яндекс.Практикум</p>
          <p className='footer__text'>Github</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
