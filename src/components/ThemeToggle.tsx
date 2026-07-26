import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  // Without a provider (bare renders in tests) theme is undefined -> treat as light.
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="p-2 rounded-full text-gray-700 hover:text-teal-600 hover:bg-teal-50 dark:text-gray-300 dark:hover:text-teal-400 dark:hover:bg-slate-800 transition-colors duration-200"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
