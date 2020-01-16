import React from 'react';
import "../assets/css/style.scss"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {  Link } from 'react-router-dom';
import {APP_CONFIG} from '../constants/config'
import {getContacts} from "../api/index"
import { Scrollbars } from 'react-custom-scrollbars';
class ModalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          total : this.props.total,
          contactIds : this.props.contactIds,
          contacts : this.props.contacts,
        }
    }
    
    componentDidMount(){
       
        let paramsForApi = {}
        paramsForApi.companyId = APP_CONFIG.COMPANY_ID
        
        if(this.props.match.params.country === "all"){

        }else{
            paramsForApi.country = APP_CONFIG.US_COUNTRY_ID;
        }
        getContacts(paramsForApi).then((result) =>{
            if (result) {
                this.props.setContacts(result);
            }
        })
    
        
    }

    componentDidUpdate(nextProps){
        if(nextProps.match.params.country !== this.props.match.params.country){
            let paramsForApi = {}
            paramsForApi.companyId = APP_CONFIG.COMPANY_ID
            
            if(this.props.match.params.country === "all"){

            }else{
                paramsForApi.country = APP_CONFIG.US_COUNTRY_ID;
            }
            getContacts(paramsForApi).then((result) =>{
                if (result) {
                    this.props.setContacts(result);
                }
            })
        }
        
    }

    handleClose = (e) => {
        this.props.closeModal();
        e.stopPropagation();
        this.props.history.push('/')
        
    }
    handleCloseModal = (e) => {
        this.props.closeModal();
    }
    
    render() {
        
        
        return (
            <Modal isOpen={true} toggle={this.handleClose}>
                <ModalHeader >
                    <Link to={{pathname: "/modal/all",    state: { modal: true },  }} className="btn btn-md button-modal-a" onClick={this.handleCloseModal} >All Contacts</Link>
                    <Link to={{pathname: "/modal/us-country",    state: { modal: true },  }} color="normal" className="btn btn-md button-modal-b" onClick={this.handleCloseModal}>US Contacts</Link>
                    <Button color="normal" className="btn btn-md button-modal-close" onClick={this.handleClose}>Close</Button>
                </ModalHeader>
                <ModalBody>
                <Scrollbars style={{ height: 300 }}>
                    
                </Scrollbars>
                </ModalBody>
                <ModalFooter>
                
                </ModalFooter>
            </Modal>
            
        );
    }
}

export default ModalPage;