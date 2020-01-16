import React from 'react';
import "../assets/css/style.scss"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
    
    handleClose = (e) => {
        this.props.closeModal();
        e.stopPropagation();
        this.props.history.push('/')
        
    }
    
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>Modal title</ModalHeader>
                <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.handleClose}>Do Something</Button>{' '}
                <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
            
        );
    }
}

export default ModalPage;