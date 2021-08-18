import axios from "axios";

export const FETCH_TESTS = "FETCH_TESTS";
export const FETCH_TESTS_SUCCESS = "FETCH_TESTS";
export const SET_ACTIVE_TEST = "SET_ACTIVE_TEST";
export const SELECT_REFERENCE = "SELECT_REFERENCE";
export const SELECT_REFERENCE_SUCCESS = "SELECT_REFERENCE_SUCCESS";
export const SELECT_REFERENCE_START = "SELECT_REFERENCE_START";
export const FILTER_TESTS = "FILTER_TESTS";
export const SET_IS_TEST_MARKED = "SET_IS_TEST_MARKED";

import { pageLoaded } from "./page";

const routes =
  process.env.MODE === "production"
    ? {
        data: (projectName) => {
          return `/data.php?repo=${projectName}`;
        },
      }
    : {
        data: (projectName) => {
          return `/${projectName}`;
        },
      };

export const fetchTests = (projectName, testName) => {
  return async (dispatch) => {
    try {
      const tests = (await axios.get(routes.data(projectName))).data;
      const updatedTests = Object.keys(tests).map((key, index) => {
        return {
          id: index,
          name: key,
          url: tests[key].url,
          status: tests[key].status,
          stands: tests[key].stands,
          desktop: {
            env: "desktop",
            page: key,
            ...tests[key].desktop,
          },
          mobile: {
            env: "mobile",
            page: key,
            ...tests[key].mobile,
          },
          tablet: {
            env: "tablet",
            page: key,
            ...tests[key].tablet,
          },
        };
      });
      dispatch(fetchTestsSuccess(updatedTests, projectName));
      if (testName) {
        const testId = updatedTests.filter((test) => {
          return test.name.toLocaleLowerCase() === testName.toLocaleLowerCase();
        })[0].id;
        dispatch(setActiveTest(testId));
      } else {
        dispatch(setActiveTest(0));
      }
      dispatch(pageLoaded());
    } catch (e) {
      console.error(e);
    }
  };
};

export const fetchTestsSuccess = (testList, projectName) => {
  return {
    type: FETCH_TESTS_SUCCESS,
    payload: {
      testList,
      projectName,
    },
  };
};

export const setActiveTest = (testIndex) => {
  return {
    type: SET_ACTIVE_TEST,
    payload: {
      activeTestIndex: testIndex,
    },
  };
};

export const selectReference = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(selectReferenceStart());
      const response = await axios.post(
        `/marker.php?repo=${getState().test.projectName}&page=${
          data.requestData.page
        }&env=${data.requestData.env}`
      );
      if (response.data.success) {
      }
      dispatch(
        selectReferenceSuccess({
          id: data.id,
          category: data.category,
        })
      );
    } catch (e) {
      console.error(e);
    }
  };
};

export const selectReferenceSuccess = (testData) => {
  return {
    type: SELECT_REFERENCE_SUCCESS,
    payload: {
      testData,
    },
  };
};

export const selectReferenceFailed = () => {
  return {
    type: SELECT_REFERENCE_FAILED,
    payload: {},
  };
};

export const selectReferenceStart = () => {
  return {
    type: SELECT_REFERENCE_START,
  };
};

export const filterTests = (filterValue) => {
  return (dispatch, getState) => {
    const filteredTests = getState().test.testList.filter((test) => {
      return (
        test.name.toUpperCase().includes(filterValue.toUpperCase()) ||
        test.url.toUpperCase().includes(filterValue.toUpperCase())
      );
    });
    dispatch(filterTestsSuccess(filteredTests));
  };
};

export const filterTestsSuccess = (filteredTests) => {
  return {
    type: FILTER_TESTS,
    payload: {
      filteredTests,
    },
  };
};

export const setIsTestMarked = (value) => {
  return {
    type: SET_IS_TEST_MARKED,
    payload: {
      value,
    },
  };
};
