import React, { Component } from 'react';
import OrderService from '../services/OrderService';

class ListOrderDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                    id: this.props.match.params.id,
                    orders: [] 
                    };


    }

    componentDidMount() {
        
        OrderService.getOrderDetailByOrderno(this.state.id).then(res => {
            console.log(res.data);
            this.setState({orders: res.data});
    });
    }


    render() {
        return (
            <div className='content'>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <h2 className="text-center">Order Detail of Order No: {this.state.id}</h2>
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
                                            <td> <img src={`data:image/png;base64,${order.image}`} style={{width: "120px", height: "80px"}} alt="img"/></td>
                                            <td> {order.name} </td>
                                            <td> {order.qty} </td>
                                            <td> {order.mrp} </td>
                                            <td> {order.price} </td>
                                            <td> {order.amount} </td>
                                        </tr>

                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListOrderDetailComponent;