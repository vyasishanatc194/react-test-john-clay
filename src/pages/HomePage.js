import React from 'react';
import {  Link } from 'react-router-dom';
import "../assets/css/style.scss"

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
                        <Link to={{pathname: "/modal/us-country",    state: { modal: true },  }} onClick={this.openModal} className="btn btn-md button-modal-b">Modal B</Link>
                    </div>
                </div>
                
            </div>
            
        );
    }
}

export default HomePage;