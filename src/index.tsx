import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppTicTacToe from "./containers/AppTicTacToe";
// import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AppTicTacToe />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
