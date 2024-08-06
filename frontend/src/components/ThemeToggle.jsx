
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../slices/themeSlice';
import './ThemeToggle.css'; // Import the CSS file

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={() => dispatch(toggleTheme())}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ThemeToggle;
