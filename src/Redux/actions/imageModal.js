export const SET_IMAGE_MODAL = "SET_IMAGE_MODAL";

export const setImageModal = (src) => {
  return {
    type: SET_IMAGE_MODAL,
    payload: {
      src: src,
    },
  };
};
