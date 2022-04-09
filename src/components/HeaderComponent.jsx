import React, { Component } from 'react';
import imagelogo from "../assets/images/aris_log1.png";
import CartComponent from './CartComponent';



class HeaderComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            counter: 0
            
        }
        this.handleUpdateCartQty = this.handleUpdateCartQty.bind(this);

    }


    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "/";
    }


    handleUpdateCartQty(count)
    {
       this.setState({counter: this.state.counter+count});
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md bg-white fixed-top">
                        <img src={imagelogo} className="navbar-brand" alt='abc' />
                        <CartComponent  item={this.state.counter}/>
                        <div >

                            <button className='btn btn-success button-right' onClick={this.logout} >Logout</button>
                        </div>

                    </nav>

                </header>
            </div>
        );
    }
}

export default HeaderComponent;