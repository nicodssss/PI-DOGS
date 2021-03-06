/* Redux */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import mainReducer from './reducer';
/* RootReducer */

/* Redux dev tools ext */
const devToolsRedux = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    mainReducer,
    compose(applyMiddleware(thunkMiddleware), devToolsRedux)
);

export default store;