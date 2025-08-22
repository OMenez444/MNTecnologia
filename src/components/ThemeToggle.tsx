import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { theme, setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('system');
    } else {
      setTheme('dark');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'dark') {
      return <Moon className="w-4 h-4" />;
    } else if (theme === 'light') {
      return <Sun className="w-4 h-4" />;
    } else {
      return <Monitor className="w-4 h-4" />;
    }
  };

  const getThemeLabel = () => {
    if (theme === 'dark') {
      return 'Modo Escuro';
    } else if (theme === 'light') {
      return 'Modo Claro';
    } else {
      return 'Sistema';
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 px-0 hover:bg-green-100 dark:hover:bg-green-900/20"
      title={`Alternar tema: ${getThemeLabel()}`}
      aria-label={`Alternar tema: ${getThemeLabel()}`}
    >
      {getThemeIcon()}
    </Button>
  );
};

export default ThemeToggle;
