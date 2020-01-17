import React from 'react';
import "../assets/css/style.scss"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {  Link } from 'react-router-dom';
import {APP_CONFIG} from '../constants/config'
import {getContacts} from "../api/index"
import { Scrollbars } from 'react-custom-scrollbars';
import {connect} from "react-redux";
import { makeGetBarState } from '../containers/filterForEvenContaner'

const makeMapStateToProps = () => {
    const getBarState = makeGetBarState()
    return (state, props) => getBarState(state, props)
  }

class ModalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          total : this.props.total,
          contactIds : this.props.contactIds,
          contacts : this.props.contacts,
          page : 1,
          basemodalOpen : true,
          search : "",
          detailModel : false,
          detailId : 0,
          country : this.props.match.params.country,
          loader : true
        }
    }
    
    componentDidMount(){
        this.handleGetContact('setContacts'); 
    }

    componentDidUpdate(nextProps){
        if(nextProps.match.params.country !== this.props.match.params.country){
            this.setState({search : "",country : nextProps.match.params.country,loader : true})
            this.props.onlyEvenContact(false)
            this.handleGetContact('setContacts');
        }
        
        
    }

    handleGetContact = (dispatchOn) => {
        this.setState({loader : true})
        let paramsForApi = {}
        paramsForApi.companyId = APP_CONFIG.COMPANY_ID
        paramsForApi.page = this.state.page;
        if(this.state.search !== ''){
            paramsForApi.query = this.state.search
        }
        if(dispatchOn !== "setContacts")
            this.setState({page: this.state.page + 1})
        if(this.props.match.params.country !== "all"){
            paramsForApi.country = APP_CONFIG.US_COUNTRY_ID;
        }
        let topHeight = 0
        if(this.refs.scrollbars !== undefined){
            topHeight = this.refs.scrollbars.getScrollTop();
        }
        
        getContacts(paramsForApi).then((result) =>{
            if (result) {
                if(dispatchOn === "setContacts"){
                    this.props.setContacts(result);
                }else{
                    this.props.paginationContact(result);
                    this.refs.scrollbars.scrollTop(topHeight);
                }
                this.setState({loader : false})
            }
        });
    }

    handleClose = (e) => {
        this.props.closeModal();
        e.stopPropagation();
        this.props.history.push('/')
        
    }
    handleCloseModal = (e) => {
        this.props.closeModal();
    }

    handleOnchangeForSearch = (e) => {
        this.setState({search : e.target.value},()=>{
            setTimeout(this.handleGetContact('setContacts'),1000)
        })
    }

    handleScrollFrame = () => {
        if(this.refs.scrollbars.getScrollHeight()  - this.refs.scrollbars.getScrollTop() === this.refs.scrollbars.getClientHeight()){
            this.handleGetContact('paginationContact');
        }
    }

    handleCheckboxChecked = (e) => {
        this.props.onlyEvenContact(e.target.checked)
    }
    
    handleOpneDetailModel = (key) => {
        this.setState({
            detailModel : true,
            detailId : key,
        })
    }
    handleCloseDetailModel = () => {
        this.setState({
            detailModel : false,
            detailId : 0,
            basemodalOpen : true
        })
    }

    render() {
        console.log(this.props);
        
        let contactsList = this.props.contacts;
        let contactDetails = contactsList[this.state.detailId]
        return (
            <div>
                <Modal isOpen={this.state.basemodalOpen} className="modal-custom" toggle={this.handleClose}>
                    <ModalHeader >
                        <Link to={{pathname: "/modal/all",    state: { modal: true },  }} className="btn btn-md button-modal-a" onClick={this.handleCloseModal} >All Contacts</Link>
                        <Link to={{pathname: "/modal/us-country",    state: { modal: true },  }} color="normal" className="btn btn-md button-modal-b" onClick={this.handleCloseModal}>US Contacts</Link>
                        <Button color="normal" className="btn btn-md button-modal-close" onClick={this.handleClose}>Close</Button>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="exampleInputSearch">Search</label>
                            <input type="text" value={this.state.search} placeholder="Search" onChange={this.handleOnchangeForSearch} className="form-control" id="exampleInputSearch" />
                        </div>
                        
                        <Scrollbars className="list-group" ref="scrollbars" universal onScrollFrame={this.handleScrollFrame}  style={{ height: 300 }}>
                            {
                                Object.keys(contactsList).map((key,index) => <div className="list-group-item d-flex justify-content-between align-items-center" key={key}>
                                    {contactsList[key].phone_number}({key}) 
                                    <span className="badge badge-primary badge-pill view-detail" onClick={() => this.handleOpneDetailModel(key)}>View</span>
                                </div>
                                )
                            }
                            {this.state.loader && <div className="justify-content-center"><div className="spinner-border"></div></div>}
                        </Scrollbars>
                    
                    </ModalBody>
                    <ModalFooter>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={this.props.onlyEven} onChange={this.handleCheckboxChecked} id="defaultCheck2" checked={this.props.onlyEven} />
                        <label className="form-check-label" htmlFor="defaultCheck2">
                            Only even
                        </label>
                    </div>
                    </ModalFooter>
                </Modal>
                <Modal className="modal-custom" isOpen={this.state.detailModel} toggle={this.handleCloseDetailModel}>
                    <ModalHeader >
                        
                    </ModalHeader>
                    <ModalBody>
                        {
                            contactDetails !== undefined && <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Name:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.first_name} {contactDetails.last_name}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Email:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.email}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Contact No:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.phone_number}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Country Id:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.country_id}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Comment:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.comment}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Status:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.status}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Favorite:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.favorite}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Color:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.color}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        CCB:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_ccb}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        PCO:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_pco}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        MC:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_mc}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Elvanto:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_elvanto}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Breeze:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_breeze}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Is Duplicate:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_duplicate}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Has duplicate:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.has_duplicate}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        CCB Primary Contact:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_ccb_primary_contact}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        PCO Primary Contact:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_pco_primary_contact}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        MC Primary Contact:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_mc_primary_contact}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Is Elvanto Primary Contact:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_elvanto_primary_contact}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Is Breeze Primary Contact:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_breeze_primary_contact}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Unsub By User:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.unsub_by_user_id}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Is Contact Deleted:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_contact_deleted}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        Is Contact Mark Deleted:
                                    </div>
                                    <div className="col-8">
                                        {contactDetails.is_contact_mark_deleted}
                                    </div>
                                </div>
                            </div>
                        }
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="normal" className="btn btn-md button-modal-close" onClick={this.handleCloseDetailModel}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

// export default ModalPage;
export default connect(makeMapStateToProps)(ModalPage)