import React, { Component } from 'react';

let linkStyle={};


class SideBarComponent extends Component {

    
    constructor(props) {
        super(props); 
        this.state={}
        this.newProduct=this.newProduct.bind(this);
        this.newUser=this.newUser.bind(this);
        this.newOrder=this.newOrder.bind(this);
    }

    newProduct = (e) => {
       
        e.preventDefault();
        //this.props.history.push('/add-product/-1');
        //this.props.history.push('/product');
        console.log('The link was clicked.');
       // window.location.href ="/add-product/-1";
       window.location.href = "/add-product/-1";
        //history.push("/add-product/-1");
      };

      newUser = (e) => {
       
        e.preventDefault();
       window.location.href = "/user";
      };


      productOffer = (e) => {
       
        e.preventDefault();
       window.location.href = "/product";
      };

      newOrder = (e) => {
       
        e.preventDefault();
       window.location.href = "/order";
      };

    render() {


        let user=JSON.parse(localStorage.getItem("user"));
         if(user.role==='Stockiest')
         {
            linkStyle={display: "none"};
         }
        return (

            <div className="sidebar">
                <a className="active" href="#home">Home</a>
                <a href="#"   onClick={this.newOrder}>Order </a>
                <a href="#"  onClick={this.productOffer}>Products Offer</a>
                <a href="#" style={linkStyle} onClick={this.newProduct} >New Product</a>
                <a href="#"  style={linkStyle} onClick={this.newUser}>Users </a>
            </div>
        );
    }
}

export default SideBarComponent

