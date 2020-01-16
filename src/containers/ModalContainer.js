import {connect} from "react-redux";
import ModalPage from "../pages/ModalPage";
import { openModal,closeModal,setContact } from '../actionCreators/index'
const mapStoreToProps = (store) => {
    return {
        modal : store.modals.modal,
        total : store.contacts.total,
        contactIds : store.contacts.contactIds,
        contacts : store.contacts.contacts,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal : () => dispatch(openModal()),
        closeModal : () => dispatch(closeModal()),
        setContacts : (contact) => dispatch(setContact(contact)),
    }
};

export default connect(mapStoreToProps, mapDispatchToProps)(ModalPage);