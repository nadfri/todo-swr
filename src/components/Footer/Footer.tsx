import ToggleTheme from '../ToggleTheme/ToggleTheme';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className='Footer'>
      <a target='_blank' href='https://github.com/nadfri/todo-swr'>
        NadfriJS @2024
      </a>
      
      <ToggleTheme />
    </footer>
  );
}
