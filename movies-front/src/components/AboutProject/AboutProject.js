import './AboutProject.css';

function AboutProject(props) {
  return(
    <section className='project-description'>
      <h2 className='project-description__title' id='project'>О проекте</h2>
      <div className='project-description__info-container'>
        <div>
          <h3 className='project-description__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='project-description__info'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div>
          <h3 className='project-description__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='project-description__info'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='project-programm'>
          <p className='project-programm__item'>1 неделя</p>
          <p className='project-programm__item'>4 недели</p>
          <p className='project-programm__item'>Back-end</p>
          <p className='project-programm__item'>Front-end</p>
        </div>
    </section>
  );
}

export default AboutProject;
