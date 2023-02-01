import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './styles.css';

export default function Component() {
  const themeContext = useTheme();
  const { toggleTheme } = themeContext;

  const [checked, setChecked] = useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("Oops!, doesn't work, check /challenges/06-switch-theme to solve this issue");
    if (toggleTheme !== undefined) {
      toggleTheme();
    }
    setChecked(e.target.checked);
  };

  return (
    <div className="theme-toggle-container">
      <input className="theme-toggle" type="checkbox" checked={checked} onChange={handleChange} />
    </div>
  );
}
