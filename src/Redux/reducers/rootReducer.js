import { combineReducers } from "redux";

import testReducer from "./test.reducer";
import pageReducer from "./page.reducer";
import projectsReducer from "./projects.reducer";

const rootReducer = combineReducers({
  test: testReducer,
  page: pageReducer,
  projects: projectsReducer,
});

export default rootReducer;
