import {applyMiddleware, createStore} from 'redux';
import rootReduser from './reducer';
import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';

const middleware = [thunk];
const store = createStore(
  rootReduser,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
