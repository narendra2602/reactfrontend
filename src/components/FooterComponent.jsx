import React, { Component } from 'react';
import imagelogo from "../assets/images/plogo.png";
class FooterComponent extends Component {
    render() {
        return (
            <div>
                <footer className="footer alert-dark navbar-fixed-bottom" style={{textAlign: "left"}}>
                <div style={{marginLeft: "20px"}}>
                <img src={imagelogo} className="navbar-brand" alt='abc' style={{marginTop:"4px"}} />

                    <span className="text-dark">Designed and Developed by Prompt Software Consultants,Indore-0731-4069098</span>
                </div>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;