import axios from "axios";

export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";

export const fetchProjectList = () => {
  return async (dispatch) => {
    const projectList = (await axios.get(`/list.php`)).data;
    dispatch(fetchProjectListSuccess(projectList));
    try {
    } catch (e) {
      console.error(e);
    }
  };
};

export const fetchProjectListSuccess = (projectList) => {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    payload: {
      projectList,
    },
  };
};
