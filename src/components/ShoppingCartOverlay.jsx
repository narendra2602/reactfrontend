import React, { Component } from 'react';
import ShoppingCartProduct from './ShoppingCartProduct';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'


import OrderService from '../services/OrderService';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

let user = null;
let showProgressBar = { display: 'none' };
class ShoppingCartOverlay extends Component {
    constructor(props) {
        super(props);
        this.updateAmountToPay = this.updateAmountToPay.bind(this);
    }
    closeOverlay() {
        document.getElementById('overlay').style.display = 'none';
        document.querySelector('body').style.overflow = 'auto';
        document.getElementById('loader').style.display = 'none';

    }
    updateAmountToPay(item) {
        this.forceUpdate();
    }


    handleCheckOut = (e) => {

       
        document.getElementById('loader').style.display = 'flex';
        document.getElementById('loader').style.justifyContent = 'center';
       
        let itemsInCart = this.props.data.itemsInCart;
        if (itemsInCart.length > 0) {
            user = JSON.parse(localStorage.getItem('user'));
            
            var orderItem = {
                "userId": user.id,
                "stkCode": user.stkcode,
                "cfCode": user.cfcode,
                "fsCode": user.fscode,
                "orderStatus": true,
                "stockiestEmail": user.stkemail,
                "cfEmail": user.cfemail,
                "fsEmail": user.fsemail,
                "userName": user.user,
                "city": user.city,
                "cfName": user.cfname,
                "cfCity": user.cfcity,
                items: []
            };


            for (var i in itemsInCart) {
                var item = itemsInCart[i];
                orderItem.items.push({
                    "pcode": item.pcode,
                    "qty": item.qty,
                    "price": item.price,
                    "mrp": item.mrp
                });
            }


            OrderService.addOrder(orderItem).then(res => {
                console.log("order Placed Successfully....." + itemsInCart.length);
                this.props.removeAllItemsFromCart();
                this.closeOverlay();

            }).catch(error => {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            });
        }
        

        
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
        for (let i = 0; i < this.props.data.itemsInCart.length; i++) {
            amountToPay += this.props.data.itemsInCart[i].price * this.props.data.itemsInCart[i].qty;

        }

        return (
            <div id='overlay'>
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


                    <span id="empty-cart">{(itemsInCart.length == 0) ? "Item cart is empty" : ""}</span>
                    <h3 id="cart-total">Cart Total</h3>
                    <div id="totals">
                        <span >Cart Totals</span>
                        <span style={{ marginLeft: "400px" }} >Number of items: <b>{this.props.data.itemsInCart.length}</b></span>
                        <span style={{ marginLeft: "300px" }}>Total: <b>₹{amountToPay.toFixed(2)}</b></span>
                    </div>
                    <button id="checkout" className='btn-primary'
                        disabled={itemsInCart.length == 0 ? true : false} onClick={this.handleCheckOut}>Checkout</button>

                    <Box id='loader' sx={showProgressBar}>
                        <CircularProgress />
                    </Box>


                </section>
            </div>
        )
    }
}

export default ShoppingCartOverlay;