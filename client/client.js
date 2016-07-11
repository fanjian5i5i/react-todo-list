import React from 'react'
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBarExampleIconMenu from '../components/Appbar';

// import App from '../components/App'
const muiTheme = getMuiTheme({
  // palette: {
  //   textColor: cyan500,
  // },
  appBar: {
    // height: 50,
  },
});
const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppBarExampleIconMenu />
  </MuiThemeProvider>
);

ReactDOM.render(
	<App/>,
	document.getElementById('app')
)