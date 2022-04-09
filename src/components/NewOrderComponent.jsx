import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import HeaderComponent from './HeaderComponent';
import ShoppingCartOverlay from './ShoppingCartOverlay';
import imgNotAvailable from './ImageVar';


let showbutton = { marginLeft: '10px' };
let itemList = [];

class NewOrderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            search: '',
            quantity: '',
            itemsInCart: [],


        }
        this.cancel=this.cancel.bind(this);
        // const  [data, setData] = useState([]);


        this.editProduct = this.editProduct.bind(this);
        //this.editProduct = this.editProduct.bind(this);
        // this.addProduct = this.addProduct.bind(this);
        // this.editProduct = this.editProduct.bind(this);
        // this.deleteProduct = this.deleteProduct.bind(this);
        // this.viewProduct = this.viewProduct.bind(this);
        this.changeProductQuantityHandler = this.changeProductQuantityHandler.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.removeAllItemsFromCart = this.removeAllItemsFromCart.bind(this);
    }

    cancel() {
        this.props.history.push('/order');
    }


    removeFromCart(item, indexInCart) {
        //console.log(this.state.itemsInCart);
        // var cloneArrayone = JSON.stringify(this.state.products);
        console.log("indexincart is " + indexInCart);
        let itemsInCart = this.state.itemsInCart;
        //let productsList = this.state.products;

        //    var productsList = JSON.parse(JSON.stringify(this.state)).products;
        //    const index = productsList.map(function(x) {return x.id; }).indexOf(id);

        var productsList = JSON.parse(JSON.stringify(this.state)).products;
        const index = productsList.map(function (x) { return x.id; }).indexOf(item.id);



        productsList[index].button = 0;
        productsList[index].qty = '';
        itemsInCart.splice(indexInCart, 1);
        this.setState({
            quantity: this.state.quantity - 1,
            //amountToPay: this.state.amountToPay - this.props.items[item.id].price,
            itemsInCart: itemsInCart,
            products: productsList

        });
        this.cart.handleUpdateCartQty(-1);
    }


    removeAllItemsFromCart() {
        let itemsInCart = this.state.itemsInCart;
        let totalItems=itemsInCart.length;

        var productsList = JSON.parse(JSON.stringify(this.state)).products;
        itemsInCart.map((item, indexx) => {
            const index = productsList.map(function (x) { return x.id; }).indexOf(item.id);

            productsList[index].button = 0;
            productsList[index].qty = '';
          
        });

          itemsInCart.splice(0, totalItems);

        this.setState({
            quantity: this.state.quantity - 1,
            //amountToPay: this.state.amountToPay - this.props.items[item.id].price,
            itemsInCart: itemsInCart,
            products: productsList

        });
        this.cart.handleUpdateCartQty(totalItems*-1);
    }




    changeSearchHandler = (event) => {
        this.setState({ search: event.target.value });
    }


    changeProductQuantityHandler = (event, id) => {
        //  this.setState({ products[0]: event.target.value });
        //const { value, name } = event.target;
        let qtyvalue = event.target.value;

        var cloneArrayone = JSON.parse(JSON.stringify(this.state)).products;
        const index = cloneArrayone.map(function (x) { return x.id; }).indexOf(id);
        cloneArrayone[index].qty = qtyvalue;
        //console.log(this.state.products[index].name+" id "+id);

        this.setState({

            products: cloneArrayone
        });

    }

    editProduct(id) {
        console.log("in edit product " + id);
        this.props.history.push(`/add-product/${id}`);

    }
    addProduct(id) {

        var cloneArrayone = JSON.parse(JSON.stringify(this.state)).products;
        const index = cloneArrayone.map(function (x) { return x.id; }).indexOf(id);
        var orderitem;

        if (cloneArrayone[index].qty > 0) {
            cloneArrayone[index].button = 1;
            orderitem = this.state.products[index];

            itemList.push(orderitem);
            this.setState({
                products: cloneArrayone,
                itemsInCart: itemList
            });
            this.cart.handleUpdateCartQty(1);

        }

    }


    componentDidMount() {
        /* let user = JSON.parse(localStorage.getItem("user"));
         if (user.role === 'Stockiest') {
             showbutton = { marginLeft: '10px', display: "none" };
         }*/


        ProductService.getProduct().then((res) => {
            this.setState({ products: res.data });
        }).catch(error => {
            console.log(error.response.data)
        });

    }

    render() {
        // Filter the table data
        let filterproducts = this.state.products;

        let searchString = this.state.search.trim().toLowerCase();
        if (searchString.length > 0) {
            // We are searching. Filter the results.
            filterproducts = filterproducts.filter((e) => e.name.toLowerCase().match(searchString) || e.category_name.toLowerCase().match(searchString));

        }

        return (

            <div className='content'>
                <ShoppingCartOverlay data={this.state} removeFromCart={this.removeFromCart} removeAllItemsFromCart={this.removeAllItemsFromCart} />
                <HeaderComponent ref={cart => this.cart = cart} />
                <br></br>
                <br></br>
                <br></br>
                <h2 className="text-center">Order Entry</h2>
                <input className="form-control mb-2" placeholder="Search Product..." onChange={this.changeSearchHandler} />
                <div className="row table-container" >
                    <table className="table table-striped table-bordered ">
                        <thead>
                            <tr className='red'>
                                <th>Product Image</th>
                                <th>Code</th>
                                <th>Category</th>
                                <th>Product Name</th>
                                <th>Pack</th>
                                <th>PTS</th>
                                <th>MRP</th>
                                <th>Offer</th>
                                <th>Validity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                filterproducts.map(
                                    (product, index) =>
                                        <tr key={product.id}>
                                            <td> <img src={`data:image/png;base64,${product.image===null?imgNotAvailable:product.image}`} style={{ width: "120px", height: "80px" }} alt="img" /></td>
                                            <td> {product.pcode} </td>
                                            <td> {product.category_name} </td>
                                            <td> {product.name} </td>
                                            <td> {product.pack} </td>
                                            <td> {product.price.toFixed(2)} </td>
                                            <td> {product.mrp.toFixed(2)} </td>
                                            <td> {product.scheme} </td>
                                            <td> {product.validity} </td>
                                            <td style={{ width: "280px" }}>
                                                <input type="number" step={"1"} placeholder="Quantity" disabled={product.button == 0 ? false : true}
                                                    value={product.qty} style={{ width: "100px", height: "38px" }} onChange={(e) => this.changeProductQuantityHandler(e, product.id)} />
                                                <button style={showbutton} disabled={product.button == 0 ? false : true} onClick={() => this.addProduct(product.id)} className='btn btn-primary'>Add to Cart</button>

                                            </td>
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

export default NewOrderComponent;