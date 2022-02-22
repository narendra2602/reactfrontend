import React, { Component } from 'react';
import ProductService from '../services/ProductService';

let showbutton={marginLeft: '10px'};
class ListProductComponent extends Component {

    
    constructor(props) {
        super(props);
        this.state = { products: [] } 

        this.editProduct = this.editProduct.bind(this);
        //this.editProduct = this.editProduct.bind(this);
        // this.addProduct = this.addProduct.bind(this);
        // this.editProduct = this.editProduct.bind(this);
        // this.deleteProduct = this.deleteProduct.bind(this);
        // this.viewProduct = this.viewProduct.bind(this);
    }

    editProduct(id)
    {
        console.log("in edit product "+id);
        this.props.history.push(`/add-product/${id}`);
        
    }
    viewProduct(id)
    {
        console.log("in view product "+id);
        this.props.history.push(`/view-product/${id}`);
        
    }


    componentDidMount() 
    {
        let user=JSON.parse(localStorage.getItem("user"));
        if(user.role==='Stockiest')
        {
            showbutton={marginLeft: '10px',display: "none"};
        }
        ProductService.getProduct().then((res) => {
            this.setState({products: res.data});
        }).catch(error => {
            console.log(error.response.data)
        });
        
    }

    render() {

      
        return (
           
            <div className='content'>
                <br></br>
                <br></br>
                <h2 className="text-center">Products List</h2>
                <div className="row table-container" >
                    <table className="table table-striped table-bordered ">
                        <thead>
                            <tr className='red'>
                                <th>Product Image</th>
                                <th>Code</th>
                                <th>Category</th>
                                <th>Product Name</th>
                                <th>PTS</th>
                                <th>MRP</th>
                                <th>Offer</th>
                                <th>Validity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.products.map(
                                    product =>
                                        <tr key={product.id}>
                                            <td> <img src={`data:image/png;base64,${product.image}`} style={{width: "120px", height: "80px"}} alt="img"/></td>
                                            <td> {product.id} </td>
                                            <td> {product.category_name} </td>
                                            <td> {product.name} </td> 
                                             <td> {product.price} </td>
                                             <td> {product.mrp} </td>
                                             <td> {product.scheme} </td>
                                             <td> {product.validity} </td>
                                            <td style={{width:"280px"}}>
                                                <button style={showbutton} onClick={() => this.editProduct(product.id)} className='btn btn-outline-primary'>Update</button>
                                                <button style={showbutton} onClick={() => this.deleteProduct(product.id)} className='btn btn-outline-danger'>Delete</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewProduct(product.id)} className='btn btn-outline-success'>View</button>
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

export default ListProductComponent;