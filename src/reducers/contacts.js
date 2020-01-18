import {   GET_CONTACT, PAGINATION_CONTACT, ONLY_EVEN} from "../actions/contactActions";
import _ from "lodash";
const initialState = {
    total : 0,
    contactIds : {},
    contacts : {},
    onlyEven : false
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
      case PAGINATION_CONTACT:
        return {
          ...state,
          total : action.payload.total,
          contactIds : [...state.contactIds,action.payload.contactIds],
          contacts : _.merge(_.cloneDeep(state.contacts),
          action.payload.contacts)
        };
      case ONLY_EVEN:
        return{
          ...state,
          onlyEven : action.payload
        }
      default:
        return state;
    }
  };
  
  export default contacts;