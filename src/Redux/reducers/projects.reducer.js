import { FETCH_PROJECTS_SUCCESS } from "@Redux/actions/projects";

const initialState = {
  isProjectListFetched: false,
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projectList: action.payload.projectList,
        isProjectListFetched: true,
      };
    default:
      return state;
  }
};

export default projectsReducer;
