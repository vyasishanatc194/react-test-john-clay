import React from 'react';
import { Route, Link } from 'react-router-dom';
import "../assets/css/style.scss"
import Modal from "../containers/ModalContainer";
class HomePage extends React.Component {

    openModal = () =>{
        this.props.openModal();
    }
    render() {
        return (
            <div id="main-container" className="justify-content-center d-flex">
                <div id="wrapper" className=" d-flex justify-content-center">
                    <div id="btn-container" className="col-md-6  d-flex justify-content-center flex-row">
                        <Link to={{pathname: "/modal/all",    state: { modal: true },  }} onClick={this.openModal} className="btn btn-md button-modal-a">Modal A</Link>
                        <button onClick={this.openModal} className="btn btn-md button-modal-b">Modal B</button>
                    </div>
                </div>
                <Route
                    path={`${this.props.match.url}/modal/all`}
                    render={() => {
                        return (
                        <Modal />
                        );
                    }}
                    />
            </div>
            
        );
    }
}

export default HomePage;