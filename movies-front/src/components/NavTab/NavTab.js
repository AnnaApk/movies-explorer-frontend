import './NavTab.css';

function NavTab(props) {
  return(
    <nav className='nav'>
      <a href='#project' className='nav__link'>О проекте</a>
      <a href='#techs' className='nav__link'>Технологии</a>
      <a href='#student' className='nav__link'>Студент</a>
    </nav>
  );
}

export default NavTab;
