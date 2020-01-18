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
          countryId  : this.props.match.params.countryId,
          loader : true
        }
    }
    
    componentDidMount(){
        this.handleGetContact('setContacts'); 
    }

    componentDidUpdate(nextProps){
        if(nextProps.match.params.countryId !== this.props.match.params.countryId){
            console.log("Inn");
            this.setState({search : "",countryId  : nextProps.match.params.countryId, loader : true, page: 1}, () => {
                this.props.onlyEvenContact(false)
                this.handleGetContact('setContacts');
            });
        }
    }

    handleGetContact = (dispatchOn) => {
        this.setState({loader : true})
        let paramsForApi = {}
        paramsForApi.companyId = APP_CONFIG.COMPANY_ID;
        paramsForApi.page = this.state.page;
        if(this.state.search !== ''){
            paramsForApi.query = this.state.search
        }
        if(dispatchOn !== "setContacts")
            this.setState({page: this.state.page + 1})
        if(this.props.match.params.countryId !== "all"){
            paramsForApi.countryId = APP_CONFIG.US_COUNTRY_ID;
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
        e.persist();
        this.setState({search : e.target.value, page: 1},()=>{
            if (e.key === 'Enter') {
                this.handleGetContact('setContacts');
            } else {
                setTimeout(this.handleGetContact('setContacts'), 3000);
            }
        });
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
                            <input type="text" value={this.state.search} placeholder="Search" onKeyPress={this.handleOnchangeForSearch} onChange={this.handleOnchangeForSearch} className="form-control" id="exampleInputSearch" />
                        </div>
                        
                        <Scrollbars className="list-group" ref="scrollbars" universal onScrollFrame={this.handleScrollFrame}  style={{ height: 300 }}>
                            {
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">PhoneNo.</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.keys(contactsList).map((key,index) => <tr key={key}>
                                                <th scope="row">{key}</th>
                                                <td>
                                                    {contactsList[key].first_name}&nbsp;{contactsList[key].last_name}
                                                </td>
                                                <td>{contactsList[key].phone_number}</td>
                                                <td>{contactsList[key].country.iso}</td>
                                                <td>
                                                    <span className="badge badge-primary badge-pill view-detail" onClick={() => this.handleOpneDetailModel(key)}>View</span>
                                                </td>
                                            </tr>)
                                        }
                                    
                                    </tbody>
                              </table>
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
                        Contact Detail
                    </ModalHeader>
                    <ModalBody>
                        {
                            contactDetails !== undefined &&  <table className="table">
                                <tbody>
                                    <tr>
                                        <th scope="row">Name</th>
                                        <td>
                                            {contactDetails.first_name} {contactDetails.last_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email</th>
                                        <td>
                                            {contactDetails.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Contact No</th>
                                        <td>
                                            {contactDetails.phone_number}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Country</th>
                                        <td>
                                            {contactDetails.country.iso}&nbsp;({contactDetails.country_id})
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Comment</th>
                                        <td>
                                            {contactDetails.comment}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Status</th>
                                        <td>
                                            {contactDetails.status}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Favorite</th>
                                        <td>
                                            {contactDetails.favorite}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Color</th>
                                        <td>
                                            {contactDetails.color}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CCB</th>
                                        <td>
                                            {contactDetails.is_ccb}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">PCO</th>
                                        <td>
                                            {contactDetails.is_pco}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">MC</th>
                                        <td>
                                            {contactDetails.is_mc}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Elvanto</th>
                                        <td>
                                            {contactDetails.is_elvanto}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Breeze</th>
                                        <td>
                                            {contactDetails.is_breeze}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Is Duplicate</th>
                                        <td>
                                            {contactDetails.is_duplicate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Has duplicate</th>
                                        <td>
                                            {contactDetails.has_duplicate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CCB Primary Contact:</th>
                                        <td>
                                            {contactDetails.is_ccb_primary_contact}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">PCO Primary Contact</th>
                                        <td>
                                            {contactDetails.is_pco_primary_contact}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">MC Primary Contact</th>
                                        <td>
                                            {contactDetails.is_mc_primary_contact}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Is Elvanto Primary Contact</th>
                                        <td>
                                            {contactDetails.is_elvanto_primary_contact}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Is Breeze Primary Contact</th>
                                        <td>
                                            {contactDetails.is_breeze_primary_contact}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Unsub By User</th>
                                        <td>
                                            {contactDetails.unsub_by_user_id}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Is Contact Deleted</th>
                                        <td>
                                            {contactDetails.is_contact_deleted}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Is Contact Mark Deleted</th>
                                        <td>
                                            {contactDetails.is_contact_mark_deleted}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
