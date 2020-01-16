import {   GET_CONTACT,SEARCH_CONTACT,COUNTRY_WISE} from "../actions/contactActions";
const initialState = {
    total : 0,
    contactIds : {},
    contacts : {},
  };
  const contacts = (state = {...initialState}, action) => {
    switch(action.type) {
      case GET_CONTACT:
        return {
          ...state,
          total : action.payload.total,
          contactIds : action.payload.contacts_ids,
          contacts : action.payload.contacts,
        };
      case SEARCH_CONTACT:
        return {...state};
      case COUNTRY_WISE:
        return {...state};
      default:
        return state;
    }
  };
  
  export default contacts;