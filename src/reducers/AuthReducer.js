
const INITIAL_STATE = {
  error: '',
  isFetchingData: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
      return {...state, isFetchingData: false};
    case 'LOGIN_USER_FAILURE':
      return {...state,
        isFetchingData: false,
        error: "Probably this account doesnt exist. Try to create one."};
    case 'SIGNUP_USER_FAILURE':
      return {...state,
        isFetchingData: false,
        error: "Something went wrong. Please, try again!"};
    case 'FETCHING_DATA':
      return {...state, isFetchingData: true};
    case 'CLEAN_ERRORS':
      return {...state, error: ''};
    default:
      return state;

  }
};
