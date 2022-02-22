import React, { Component } from 'react';

import ProductService from '../services/ProductService';
import CreateCategoryComponent from './CreateCategoryComponent';
import Select from 'react-select';
import CategoryService from '../services/CategoryService';



class CreateProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: '',
            price: '',
            mrp: '',
            image: '',
            category: '',
            options: []


        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeMrpHandler = this.changeMrpHandler.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



    handleChange = selectedOption => {
        this.setState({ category: selectedOption.value });
    };

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }
    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }
    changePriceHandler = (event) => {
        this.setState({ price: event.target.value });
    }
    changeMrpHandler = (event) => {
        this.setState({ mrp: event.target.value });
    }

    changeImageHandler = (event) => {
        event.preventDefault();
        var img = event.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {

            const filesize = (reader.result.replace("data:", "").replace(/^.+,/, "")).length * (3 / 4) - 2;
            console.log(filesize);
            this.setState({
                image: filesize <= 100000 ? reader.result : ""
            });
        }
        reader.readAsDataURL(img);

    }


    componentDidMount() {
        console.log(this.state.id);

        CategoryService.getCategoryList().then(res => {
            this.setState({ options: res.data });

        });


        if (this.state.id == -1) {
            return
        } else {
            ProductService.getProductById(this.state.id).then((res) => {
                let product = res.data;
                console.log(product);
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

    }

    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let base64String = this.state.image.replace("data:", "").replace(/^.+,/, "");
    

        let product = { name: this.state.name, description: this.state.description, price: this.state.price, mrp: this.state.mrp, image: base64String, category: this.state.category };
        
        if (this.state.id == -1) {
            // EmployeeService.createEmployee(employee).then(res => {
            //     this.props.history.push('/employees');
            //});
            ProductService.addProduct(product).then(res => {
                this.props.history.push('/product');
            }).catch(error => {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
        });;
            console.log("Add product");

        } else {
            ProductService.updateProduct(product, this.state.id).then(res => {
                this.props.history.push('/product');
            });
        }
    }

    cancel() {
        this.props.history.push('/product');
    }


    getTitle() {
        if (this.state.id == -1) {
            return <h3 className='text-center'>Add Product</h3>

        }
        else {
            return <h3 className='text-center'>Update Product</h3>
        }
    }



    render() {
        let imagePreviewUrl = this.state.image;
        console.log("product mein category is " + this.state.category);
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style={{width:"180px", height:"150px"}} alt="imgage" />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image of 1 Mb</div>);
        }


        return (
            <div className='content' >

                <div className='cardUpdateView'>
                    <div className='row'>
                        <div className='card col-md-12  '>
                            {this.getTitle()}
                            <div className='card-body'>
                                <form>

                                    <div className="row mb-3">
                                        <div className="col-sm-4">
                                            <label className="col-sm-2 col-form-label"> {$imagePreview}</label>
                                            <input type="file" name="image" className="form-control" onChange={this.changeImageHandler} />
                                        </div>

                                        <div className='col'>

                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > Category</label>
                                                </div>
                                                <div className='col-9'>
                                                    <Select
                                                        value={this.state.options.filter(({ value }) => value === this.state.category)}
                                                        onChange={this.handleChange}
                                                        options={this.state.options}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > Product Name</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input placeholder='Product Name' name="name" className='form-control'
                                                        value={this.state.name} onChange={this.changeNameHandler} />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > Description</label>
                                                </div>
                                                <div className='col-9'>
                                                    <textarea rows={5} placeholder='Description' name="description" className='form-control'
                                                        value={this.state.description} onChange={this.changeDescriptionHandler} />
                                                </div>
                                            </div>


                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > Price</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type="number" placeholder='PTS' name="price" className='form-control'
                                                        value={this.state.price} onChange={this.changePriceHandler} />
                                                </div>
                                            </div>


                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > MRP</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type="number" placeholder='MRP' name="mrp" className='form-control'
                                                        value={this.state.mrp} onChange={this.changeMrpHandler} />
                                                </div>
                                            </div>



                                            <div className="row mb-3">
                                                <div className='col'>
                                                    <button className='btn btn-success' style={{ marginLeft:"150px",marginTop: "10px" }} onClick={this.saveOrUpdateProduct}>Save</button>
                                                    <button className='btn btn-danger' style={{ marginTop: "10px", marginLeft: "10px" }} onClick={this.cancel.bind(this)} >Cancel</button>
                                                </div>
                                            </div>




                                        </div>


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateProductComponent;