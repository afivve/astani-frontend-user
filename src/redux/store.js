import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.VITE_MODE !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
