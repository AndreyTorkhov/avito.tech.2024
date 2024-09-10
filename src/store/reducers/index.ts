import { combineReducers } from "redux";
import advertisementReducer from "./advertisementReducer";

const rootReducer = combineReducers({
  advertisement: advertisementReducer,
});

export default rootReducer;
