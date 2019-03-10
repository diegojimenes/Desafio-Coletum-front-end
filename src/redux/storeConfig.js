import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  const store = createStore(reducers, {}, applyMiddleware(thunk));
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./reducers/index").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
