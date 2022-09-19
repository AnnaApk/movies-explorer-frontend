import './AboutMe.css';
import authorPhoto from '../../images/photo.png';

function AboutMe(props) {
  return(
    <section className='author'>
      <h2 className='author__title' id='student'>Студент</h2>
      <div className='author__content'>
        <div>
          <p className='author__name'>Anna</p>
          <p className='author__profession'>Фронтенд-разработчик, 30 лет</p>
          <p className='author__info'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <p className='author__sign'>Github</p>
        </div>
        <div>
        <img src={authorPhoto} alt='Портрет автора' className='author__photo' />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
