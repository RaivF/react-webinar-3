export const initialState = {
  data: {},
  waiting: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: {}, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: {}, waiting: false };

    case "comments/add-start":
      return {
        ...state,
        waiting: true,
      };

    case "comments/add-success":
      return {
        ...state,
        data: {
          items: [...state.data.items, action.payload.data],
        },
        waiting: false,
      };

    case "comments/add-error":
      return {
        ...state,
        waiting: false,
      };

    default:
      return state;
  }
};

export default reducer;
