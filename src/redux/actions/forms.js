import { config } from "../../config";

export const get_Forms = () => {
  return dispatch => {
    fetch(config.api)
      .then(res =>
        res
          .json()
          .then(({ data }) =>
            dispatch({ type: "GET_FORM", payload: data.form_structure })
          )
      )
      .catch(err => console.log(err));
  };
};
