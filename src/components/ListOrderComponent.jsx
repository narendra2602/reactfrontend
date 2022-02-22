import React, { Component } from 'react';
import OrderService from '../services/OrderService';

class ListOrderComponent extends Component {

    constructor() {
        super();
        this.state = { orders: [] };


    }

    editOrder(id)
    {
        console.log("in edit user id is  "+id);
        this.props.history.push(`/add-order/${id}`);
        
    }
    createOrder = (e) =>{
        e.preventDefault();
        this.props.history.push('/add-order/-1');
    }

    componentDidMount() {
        OrderService.getOrderList().then(res => {
            this.setState({ orders: res.data });
        }).catch(error => {
            console.log(error.response.data)
        });
    }

    render() {
        return (
            <div className='content'>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div >
                    <button className='btn btn-primary ' onClick={this.createOrder} >+ New Order</button>
                </div>

                <h2 className="text-center">Order List</h2>
                <div className="row table-container" >
                    <table className="table table-striped table-bordered ">
                        <thead>
                            <tr className='red'>
                                <th>Order No</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.orders.map(
                                    order =>
                                        <tr key={order.id}>
                                            <td> {order.id} </td>
                                            <td> {order.orderDate} </td>
                                            <td> {order.orderStatus} </td>
                                            <td style={{ width: "280px" }}>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editUser(order.id)} className='btn btn-outline-primary'>View</button>
                                            </td>
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

export default ListOrderComponent;