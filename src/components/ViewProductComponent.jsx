import React, { Component } from 'react';
import ProductService from '../services/ProductService';

class ViewProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: '',
            price: '',
            mrp: '',
            image: '',
            category: ''
        }
         this.cancel=this.cancel.bind(this);
    }

    cancel() {
        this.props.history.push('/product');
    }


    componentDidMount()
    {
        ProductService.getProductById(this.state.id).then(res => {
                let product=res.data;
                this.setState({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    mrp: product.mrp,
                    image: product.image ? "data:image/jpg;base64," + product.image : "",
                    category: product.category
                });
        });
    }

    render() {
         
        return (
            <div className='content'>
            <div className="cardView">
                <center><img src={this.state.image} alt="Product" style={{width:"150px", height:"130px"}}/></center>
                    <h1>{this.state.name}</h1>
                    <p className="price">PTS: {this.state.price}   MRP: {this.state.mrp}</p> 
                    <p>{this.state.description} </p>
                    <p><button className='btn btn-primary' style={{marginBottom: "10px"}} onClick={this.cancel.bind(this)} >Back</button></p>                    
            </div>
            </div>
        );
    }
}

export default ViewProductComponent;