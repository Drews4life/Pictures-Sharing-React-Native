
const INITIAL_STATE = {
  places: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_PLACES':
      return {
        ...state,
        places: action.payload
      };
    case 'REMOVE_PLACE':
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.payload;
        }),
      };
    default:
      return state;
  }
};
