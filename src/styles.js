// styles.js
export const theme = {
    primaryBg: '#181e47',
    secondaryBg: '#722860',
    accentColor: '#ff3a5d',
    textColor: '#55fef0',
  };
  
  export const globalStyles = `
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: ${theme.primaryBg};
      color: ${theme.textColor};
    }
  `;
  