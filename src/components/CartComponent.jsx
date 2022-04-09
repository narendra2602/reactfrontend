import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBadge } from '@fortawesome/free-solid-svg-icons';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

class CartComponent extends Component {

    
    constructor(props) {
        super(props);
        this.showOverlay = this.showOverlay.bind(this);

    }

    

    showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
        document.querySelector('body').style.overflow = 'hidden';
        console.log("in method showoverlay")
    }

    render() {
         console.log("value of count is "+this.props.item);
        return (
            <div id="cart">
                {/* Hide a number of items if it's equal 0 */}
                {/* <span className='primary'>{5}</span> */}

                {/* <span className='cart-value-right danger '>{5}
                    <i className="p2 fa fa-circle fa-stack-2x"></i>
                </span>
                <a href='#'><FontAwesomeIcon icon={faShoppingCart} size="2x" className='cart-right' onClick={this.showOverlay} /></a>
                <i className="fas fas-shopping-cart" onClick={this.showOverlay}></i> */}


                <div className='cart-right'>
                <IconButton aria-label="cart" onClick={this.showOverlay}>
                    <StyledBadge badgeContent={this.props.item} color="secondary" >
                        <ShoppingCartIcon style={{width:"48px", height:"48px"}}/>
                    </StyledBadge>
                </IconButton>
                </div>
                
            </div>

        );
    }
}


export default CartComponent;

