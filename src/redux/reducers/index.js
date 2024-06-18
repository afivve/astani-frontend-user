import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import courseReducer from "./CourseReducer";
import DetailReducer from "./DetailReducer";
import Identify from "./IdentifyReducer";
import Image from "./ImageReducer";
import Admin from "./AdminReducers"

export default combineReducers({
  auth: authReducer,
  course: courseReducer,
  detail: DetailReducer,
  identify: Identify,
  image: Image,
  admin: Admin
});
