export const INITIAL_STATE = {
  error: false,
  loading: true,
};

export const updateState = (state, props) => {
  return { ...state, ...props };
};
