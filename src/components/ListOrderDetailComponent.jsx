import React, { Component } from 'react';
import OrderService from '../services/OrderService';
import imgNotAvailable from './ImageVar';

class ListOrderDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            cf_name: this.props.match.params.cf_name,
            stk_name: this.props.match.params.stk_name,
            orders: []
        };

        this.cancel = this.cancel.bind(this);
    }

    cancel() {
        this.props.history.push('/order');
    }

    componentDidMount() {
        console.log("cf name " + this.state.cf_name);
        OrderService.getOrderDetailByOrderno(this.state.id).then(res => {
            console.log(res.data);
            this.setState({ orders: res.data });
        });
    }


    render() {

        let amountToPay = 0;
        let orderdate = null;
        for (let i = 0; i < this.state.orders.length; i++) {
            amountToPay += this.state.orders[i].amount;
            orderdate = this.state.orders[i].order_date;

        }

        return (
            <div className='content'>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className='col'>
                    <div className="row">
                        <div className='col-4'>
                            <label className="form-label" > Order No: <b>{this.state.id}</b></label>
                        </div>
                        <div className='col-4'>
                            <label className="form-label" > Order Date: <b>{orderdate}</b></label>
                        </div>
                        <div className='col-4'>
                            <label className="form-label" > Tentative Amount: <b>{amountToPay.toFixed(2)}</b></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-8'>
                            <label className="form-label" > CF Name: <b>{this.state.cf_name}</b></label>
                        </div>
                        <div className='col-4'>
                            <label className="form-label" > Stockiest Name: <b>{this.state.stk_name}</b></label>
                        </div>
                    </div>
                </div>


                {/* <h5 className="text-center">Order No: {this.state.id}   &nbsp;&nbsp;&nbsp; Tentative Amount {amountToPay.toFixed(2)}</h5> */}
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
                                            <td> <img src={`data:image/png;base64,${order.image === null ? imgNotAvailable : order.image}`} style={{ width: "120px", height: "80px" }} alt="img" /></td>
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
                <div align="right"><button className='btn btn-primary' style={{ marginTop: "10px" }} onClick={this.cancel.bind(this)} >Back</button></div>
            </div>
        );
    }
}

export default ListOrderDetailComponent;