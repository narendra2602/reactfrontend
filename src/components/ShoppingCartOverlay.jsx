import React, { Component } from 'react';
import ShoppingCartProduct from './ShoppingCartProduct';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'



import OrderService from '../services/OrderService';

let user=null;
class ShoppingCartOverlay extends Component {
    constructor(props) {
        super(props);
        this.updateAmountToPay = this.updateAmountToPay.bind(this);
    }
    closeOverlay() {
        document.getElementById('overlay').style.display = 'none';
        document.querySelector('body').style.overflow = 'auto';
    }
    updateAmountToPay(item) {
        this.forceUpdate();
    }

    
    handleCheckOut= (e) => {

        user = JSON.parse(localStorage.getItem('user'));
        let itemsInCart = this.props.data.itemsInCart;
        var orderItem = {
            "userId": user.id,
            "stkCode": user.stkcode,
            "cfCode": user.cfcode,
            "fsCode": user.fscode,
            "orderStatus": true, 
            items: []
        };


        for(var i in itemsInCart) {    
            var item = itemsInCart[i];   
            orderItem.items.push({ 
                "pcode" : item.pcode,
                "qty"  : item.qty,
                "price"       : item.price, 
                "mrp"       : item.mrp 
            });
        }


        OrderService.addOrder(orderItem).then(res => {
            console.log("order Placed Successfully....."+itemsInCart.length);
            // for(var i in itemsInCart) {  
            //     var item = itemsInCart[i]; 
            //     console.log(i+" "+item.items);
            //     this.props.removeFromCart(item, i);
            // }
            
            this.props.removeAllItemsFromCart();
            this.closeOverlay(); 
            


        }).catch(error => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        });                
        console.log("checkout clicked.....");
    }


    render() {
       // console.log(this.props.data);
        let itemsInCart = this.props.data.itemsInCart.map((item, index) => {
            // Return key which defines an order of items inside a cart. The order in a cart is different than in database
            return <ShoppingCartProduct key={index}
                item={item}
                indexInCart={index}
                removeFromCart={this.props.removeFromCart}
            />
        });
        let amountToPay = 0;
        for (let i=0; i<this.props.data.itemsInCart.length; i++) {
           amountToPay += this.props.data.itemsInCart[i].price * this.props.data.itemsInCart[i].qty;
           
        }

        return (
            <div id="overlay">
                <section id="shopping-cart">
                    <div id="cart-header">
                        <span id="cart-title">Order Items</span>

                        <IconButton onClick={this.closeOverlay.bind(this)}>
                            <CloseIcon color="success" />
                        </IconButton>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsInCart}
                        </tbody>
                    </table>


                    <span id="empty-cart">{(itemsInCart.length == 0) ? "Shopping cart is empty" : ""}</span>
                    <h3 id="cart-total">Cart Total</h3>
                    <div id="totals">
                        <span >Cart Totals</span>
                        <span style={{marginLeft: "400px"}} >Number of items: {this.props.data.itemsInCart.length}</span>
                        <span style={{marginLeft: "400px"}}>Total: ₹{amountToPay.toFixed(2)}</span>
                    </div>
                    <button id="checkout"
                        disabled={itemsInCart.length == 0 ? true : false} onClick={this.handleCheckOut}>Checkout</button>




                </section>
            </div>
        )
    }
}

export default ShoppingCartOverlay;