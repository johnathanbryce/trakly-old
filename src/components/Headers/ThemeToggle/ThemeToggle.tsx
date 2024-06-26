'use client';
import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.css';
// External Libraries
import { IconSun, IconMoon } from '@tabler/icons-react';

const setDarkMode = () => {
  document.querySelector("body")?.setAttribute("data-theme", 'dark');
}

const setLightMode = () => {
  document.querySelector("body")?.setAttribute("data-theme", 'light');
}

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // check localStorage for the theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      setDarkMode();
    } else {
      setIsDarkMode(false);
      setLightMode();
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    if (!isDarkMode) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  return (
    <>
       {isDarkMode ? <IconSun className={styles.icon} onClick={toggleTheme}/> : <IconMoon className={styles.icon} onClick={toggleTheme}/>} 
    </>

  );

};

export default ThemeToggle;

