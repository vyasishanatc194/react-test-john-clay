import {connect} from "react-redux";
import HomePage from "../pages/HomePage";
import { openModal } from '../actionCreators/index'
// import { OPEN_MODAL_A,OPEN_MODAL_B } from '../../actions/contactActions';
const mapStoreToProps = (store) => {
    return {
        model : store.modals.modal,
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal : () => dispatch(openModal()),
        
    }
};

export default connect(mapStoreToProps, mapDispatchToProps)(HomePage);