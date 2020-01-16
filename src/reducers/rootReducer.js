import {combineReducers} from "redux";
import contacts from "./contacts";
import modals from "./modals";

const rootReducer = combineReducers({
    modals,
    contacts
});

export default rootReducer;