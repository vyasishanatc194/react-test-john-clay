import {   GET_CONTACT,SEARCH_CONTACT,COUNTRY_WISE} from "../actions/contactActions";
const initialState = {
    partId: null,
  };
  const contacts = (state = {...initialState}, action) => {
    switch(action.type) {
      case GET_CONTACT:
        return {
          ...state,
          partId: action.payload.partId,
        };
      case SEARCH_CONTACT:
        return {...state, partId: null};
      case COUNTRY_WISE:
        return {...state, partId: action.partId};
      default:
        return state;
    }
  };
  
  export default contacts;