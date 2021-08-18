import {
  FETCH_TESTS_SUCCESS,
  SET_ACTIVE_TEST,
  SELECT_REFERENCE_SUCCESS,
  SELECT_REFERENCE_START,
  FILTER_TESTS,
  SET_IS_TEST_MARKED,
} from "@Redux/actions/test";

const initialState = {
  isTestMarked: false,
  isTestMarkProcess: false,
  projectName: "",
  activeTestName: "",
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TESTS_SUCCESS:
      return {
        ...state,
        testList: action.payload.testList,
        activeTest: action.payload.testList[0],
        isTestsLoaded: true,
        projectName: action.payload.projectName,
        filteredTests: action.payload.testList,
      };
    case FILTER_TESTS:
      return {
        ...state,
        filteredTests: action.payload.filteredTests,
      };
    case SET_ACTIVE_TEST:
      document.querySelector("title").innerText =
        state.testList[action.payload.activeTestIndex].name;
      return {
        ...state,
        activeTest: state.testList[action.payload.activeTestIndex],
        activeTestIndex: action.payload.activeTestIndex,
      };

    case SET_IS_TEST_MARKED:
      return {
        ...state,
        isTestMarked: action.payload.value,
      };
    case SELECT_REFERENCE_SUCCESS:
      const updatedTestList = state.testList;
      const id = action.payload.testData.id;
      const category = action.payload.testData.category;
      updatedTestList[id][category].toggled =
        !updatedTestList[id][category].toggled;

      return {
        ...state,
        testList: [...updatedTestList],
        isTestMarked: true,
        activeTest: {
          ...updatedTestList[id],
        },
      };
    case SELECT_REFERENCE_START:
      return {
        ...state,
        isTestMarked: false,
        isTestMarkProcess: true,
      };
    default:
      return state;
  }
};

export default testReducer;
