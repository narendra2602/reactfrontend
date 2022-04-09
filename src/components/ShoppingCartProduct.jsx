import React, { Component } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';

class ShoppingCartProduct extends Component {
    constructor(props) {
      super(props);
      this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
      this.handleQuantityChange = this.handleQuantityChange.bind(this);
    }
    handleRemoveFromCart(e) {
       this.props.removeFromCart(this.props.item, this.props.indexInCart);
     // this.props.item.splice(this.props.indexInCart, 1);
     // let itemsInCart = this.props.data;
    
     console.log(this.props.item);
     console.log(this.props.indexInCart);
      // itemsInCart.splice(this.props.indexInCart, 1);

    }
    handleQuantityChange(e) {
      this.props.item.qty = e.target.value;
      // Update total value
      this.forceUpdate();
 
    }
    render() {
        //console.log(this.props.item);
        let cartitem = this.props.item;
        console.log(cartitem.id);
        let amount=parseFloat(cartitem.qty*cartitem.price).toFixed(2);
        console.log(amount);
      return(
        <tr className="items-in-cart">
          {/* <td><img src={this.props.item.image}></img></td> */}
          <td><img src={`data:image/png;base64,${this.props.item.image}`}></img></td>

          <td>{this.props.item.name}</td> 
          <td>₹{parseFloat(cartitem.price).toFixed(2)}</td>
          <td>
            {/* <input type="number" name="quantity" value={this.props.item.qty} onChange={this.handleQuantityChange} /> */}
            <input type="number"  step={"1"}  placeholder="Quantity" 
              value={this.props.item.qty} style={{ width: "100px", height: "38px" }} onChange={this.handleQuantityChange} />


          </td>
          <td>₹{parseFloat(cartitem.qty*cartitem.price).toFixed(2)}</td>


          <td><i className="fas fa-trash"
                onClick={this.handleRemoveFromCart}></i>
                
                
                <DeleteIcon color="primary"  fontSize="large" onClick={this.handleRemoveFromCart} />

           </td>
        </tr>
      )
    }
  }
  
export default ShoppingCartProduct;