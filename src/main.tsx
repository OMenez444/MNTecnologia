import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Força o modo escuro como padrão
const forceDarkMode = () => {
  // Remove classes de tema anteriores
  document.documentElement.classList.remove('light', 'dark');
  
  // Verifica se há um tema salvo
  const savedTheme = localStorage.getItem('theme');
  
  if (!savedTheme) {
    // Se não há tema salvo, define o modo escuro como padrão
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else if (savedTheme === 'system') {
    // Se é sistema, verifica a preferência
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
  } else {
    // Aplica o tema salvo
    document.documentElement.classList.add(savedTheme);
  }
  
  // Força o color-scheme para dark
  document.documentElement.style.colorScheme = 'dark';
};

// Executa antes do React renderizar
forceDarkMode();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
