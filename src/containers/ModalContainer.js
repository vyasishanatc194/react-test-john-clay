import {connect} from "react-redux";
import ModalPage from "../pages/ModalPage";
import { openModal,closeModal,setContact,paginationContact,onlyEvenContact } from '../actionCreators/index'
const mapStoreToProps = (store) => {
    return {
        modal : store.modals.modal,
        total : store.contacts.total,
        contactIds : store.contacts.contactIds,
        contactsList : store.contacts.contacts,
        onlyEven : store.contacts.onlyEven
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal : () => dispatch(openModal()),
        closeModal : () => dispatch(closeModal()),
        setContacts : (contact) => dispatch(setContact(contact)),
        paginationContact : (contact) => dispatch(paginationContact(contact)),
        onlyEvenContact : (checkboxValue) => dispatch(onlyEvenContact(checkboxValue)),
    }
};

export default connect(mapStoreToProps, mapDispatchToProps)(ModalPage);