import { OPEN_MODAL,CLOSE_MODAL} from "../actions/contactActions";
const initialState = {
    modal : false,
  };
  const modals = (state = {...initialState}, action) => {
    switch(action.type) {
        case OPEN_MODAL:
            return {
            ...state,
            modal : true,
            
        };
        case CLOSE_MODAL:
            return {...state, modal : false};
        default:
            return state;
    }
  };
  
  export default modals;