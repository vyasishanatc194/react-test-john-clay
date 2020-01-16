import {connect} from "react-redux";
import ModalPage from "../pages/ModalPage";
import { openModal,closeModal } from '../actionCreators/index'
const mapStoreToProps = (store) => {
    return {
        modal : store.modals.modal
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal : () => dispatch(openModal()),
        closeModal : () => dispatch(closeModal()),
    }
};

export default connect(mapStoreToProps, mapDispatchToProps)(ModalPage);