import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import reportWebVitals from './reportWebVitals';
const theme = createMuiTheme({
  palette:{
    primary: blue,
    secondary: {
      main: '#01579b',
    }
  },
  typography: {
    "fontFamily": `"Raleway", "Roboto", "Helvetica", "Arial", sans-serif`,
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
