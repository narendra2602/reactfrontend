import React, { Component } from 'react';
import imagelogo from "../assets/images/aris_log1.png";



class HeaderComponent extends Component {
    
    
    logout = (e) =>{
        e.preventDefault();
        localStorage.clear();
        window.location.href = "/";
    }

    
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md bg-white fixed-top">
                        <img src={imagelogo} className="navbar-brand" alt='abc' />

                        <div >
                            <button className='btn btn-success button-right'   onClick={this.logout} >Logout</button>
                        </div>

                    </nav>

                </header>
            </div>
        );
    }
}

export default HeaderComponent;