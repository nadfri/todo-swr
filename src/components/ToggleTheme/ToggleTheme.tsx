import { useLayoutEffect, useState } from 'react';
import './ToggleTheme.scss';
import MoonIcon from '../Icons/MoonIcon';
import SunIcon from '../Icons/SunIcon';

export default function ToggleTheme() {
  const initialTheme = localStorage.getItem('theme') || 'dark';

  const [theme, setTheme] = useState(initialTheme);

  useLayoutEffect(() => {
    //useLayoutEffect prevent flash of light theme
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      className="ToggleTheme"
      onClick={toggleTheme}
      aria-label={`Toggle theme to ${theme === 'light' ? 'dark' : 'light'}`}
    >
      {theme === 'dark' ? (
        <SunIcon className="SunIcon" />
      ) : (
        <MoonIcon className="MoonIcon" />
      )}
    </button>
  );
}
