import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../slices/themeSlice';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../../public/css/ThemeToggle.css'; // Import the CSS file

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div className="theme-toggle">
      <input
        className="theme-toggle-input"
        type="checkbox"
        checked={isDarkMode}
        onChange={() => dispatch(toggleTheme())}
        id="theme-toggle"
      />
      <label className="theme-toggle-label" htmlFor="theme-toggle">
        <FaSun className="sun-icon" />
        <FaMoon className="moon-icon" />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
