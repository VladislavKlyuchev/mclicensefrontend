import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux';
import { HashRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'colors.css/css/colors.min.css';
import 'typeface-roboto';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import lime from '@material-ui/core/colors/lime';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

const store = createStore(reducers, applyMiddleware(thunk));

const theme = createMuiTheme({
	palette: {
		primary: lime,
		secondary: pink,
		error: red,
		// Used by `getContrastText()` to maximize the contrast between the background and
		// the text.
		contrastThreshold: 3,
		// Used to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2
	},
	typography: {
		useNextVariants: true
	}
});

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<MuiThemeProvider theme={theme}>
				<App />
			</MuiThemeProvider>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
