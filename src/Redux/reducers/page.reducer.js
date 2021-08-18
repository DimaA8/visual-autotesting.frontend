import { PAGE_LOADED } from "@Redux/actions/page";

const initialState = {
  pageLoaded: false,
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_LOADED:
      return {
        pageLoaded: true,
      };
    default:
      return state;
  }
};

export default pageReducer;
