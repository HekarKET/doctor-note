import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "../reducers/userReducer";
const combinedReducer = combineReducers({
  userReducer,
});

const store = createStore(
  combinedReducer,
  compose(
    applyMiddleware(thunk),
    typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
export default store;
