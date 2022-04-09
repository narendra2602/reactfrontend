import React, { Component } from 'react';
import OrderService from '../services/OrderService';

let linkStyle={};
class ListOrderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { orders: [],search:'' };

        this.viewOrderDetails = this.viewOrderDetails.bind(this);


    }

    viewOrderDetails(id)
    {
        console.log("in edit user id is  "+id);
        this.props.history.push(`/orderdetial/${id}`); 
        
        
    }
    createOrder = (e) =>{
        e.preventDefault();
        this.props.history.push('/neworder');
    }

    changeSearchHandler = (event) => {
        this.setState({ search: event.target.value });
    }


    componentDidMount() {
        
        OrderService.getOrderList().then(res => {
            this.setState({ orders: res.data });
        }).catch(error => {
            console.log(error.response.data)
        });
    }

    render() {

        let user=JSON.parse(localStorage.getItem("user"));
        if(user.role==='admin')
        {
           linkStyle={display: "none"}; 
        }

        let filterorders = this.state.orders;
        let searchString = this.state.search.trim().toLowerCase();
        if (searchString.length > 0) {
            // We are searching. Filter the results.
            filterorders = filterorders.filter((e) => e.cf_name.toLowerCase().match(searchString) || e.stk_name.toLowerCase().match(searchString) || e.order_date.match(searchString));
        }


        return (
            <div className='content'>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div >
                    <button className='btn btn-primary ' style={linkStyle} onClick={this.createOrder} >+ New Order</button>
                </div>

                <h2 className="text-center">Order List</h2>
                <input className="form-control mb-2" placeholder="Search..." onChange={this.changeSearchHandler} />
                <div className="row table-container" >
                    <table className="table table-striped table-bordered ">
                        <thead>
                            <tr className='red'>
                                <th>CF Name</th>
                                <th>Stk Name</th>
                                <th>Order No</th>
                                <th>Order Date</th>
                                <th>Tentative Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                               filterorders.map(
                                    order =>
                                        <tr key={order.id}>
                                            <td> {order.cf_name} </td>
                                            <td> {order.stk_name} </td>
                                            <td> {order.id} </td>
                                            <td> {order.order_date} </td>
                                            <td> {order.amount.toFixed(2)} </td>
                                            <td> {order.orderStatus} </td>
                                            <td style={{ width: "280px" }}>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewOrderDetails(order.id)} className='btn btn-outline-primary'>View</button>
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