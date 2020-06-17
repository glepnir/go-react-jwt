import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import history from '@utils/history';
import { rootReducer } from './reducer';
import rootSaga from './saga';

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

declare let window: ExtendedWindow;

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

sagaMiddleware.run(rootSaga);

export default store;
