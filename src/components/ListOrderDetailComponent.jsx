import React, { Component } from 'react';
import OrderService from '../services/OrderService';
import imgNotAvailable from './ImageVar';

class ListOrderDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                    id: this.props.match.params.id,
                    orders: [] 
                    };

        this.cancel=this.cancel.bind(this);
    }

    cancel() {
        this.props.history.push('/order');
    }

    componentDidMount() {
        
        OrderService.getOrderDetailByOrderno(this.state.id).then(res => {
            console.log(res.data);
            this.setState({orders: res.data});
    });
    }


    render() {

        let amountToPay = 0;
        for (let i=0; i<this.state.orders.length; i++) {
           amountToPay += this.state.orders[i].amount;
           
        }

        return (
            <div className='content'>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <h2 className="text-center">Order Detail of Order No: {this.state.id}   &nbsp;&nbsp;&nbsp; Tentative Amount {amountToPay.toFixed(2)}</h2>
                <div className="row table-container" >
                    <table className="table table-striped table-bordered ">
                        <thead>
                            <tr className='red'>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>MRP</th>
                                <th>Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.orders.map(
                                    order =>
                                        <tr key={order.id}>
                                            <td> <img src={`data:image/png;base64,${order.image===null?imgNotAvailable:order.image}`} style={{width: "120px", height: "80px"}} alt="img"/></td>
                                            <td> {order.name} </td>
                                            <td> {order.qty} </td>
                                            <td> {order.mrp.toFixed(2)} </td>
                                            <td> {order.price.toFixed(2)} </td>
                                            <td> {order.amount.toFixed(2)} </td>
                                        </tr>

                                )
                            }

                        </tbody>
                    </table>
                </div>
                <div align="right"><button className='btn btn-primary' style={{marginTop: "10px"}} onClick={this.cancel.bind(this)} >Back</button></div> 
            </div>
        );
    }
}

export default ListOrderDetailComponent;