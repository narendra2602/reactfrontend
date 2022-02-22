import React, { Component } from 'react';
import Select from 'react-select';
import StateService from '../services/StateService';
import UserService from '../services/UserService';   
const options = [{ "value":  "C&F", "label": "C&F" }, { "value": "FS", "label": "FS" }, { "value": "Stockiest", "label": "Stockiest" }];
//const stateCombo = [{ "value": 23, "label": "Madhya Pradesh" }, { "value": 27, "label": "Maharashtra" }, { "value": 8, "label": "Rajasthan" }];
class CreateUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            password: '',
            username: '',
            email: '',
            phone: '',
            city: '',
            state_code: '',
            role: '',
            stateCombo: []



        }
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = selectedOption => {
        this.setState({ role: selectedOption.value });
    };

    changeUsernameHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    changeCityHandler = (event) => {
        this.setState({ city: event.target.value });
    }
    changePhoneHandler = (event) => {
        if(event.target.value.length==11  ) return false;
        this.setState({ phone: event.target.value });
    }

    handleChangeState = selectedOption => {
        this.setState({ state_code: selectedOption.value });
    };


    componentDidMount()
    {
        StateService.getStateList().then(res =>{
            this.setState({ stateCombo: res.data });
        }).catch(error => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
    });

    if(this.state.id==-1)
    {
         return;
    }
    else{
            UserService.getUserById(this.state.id).then(res =>{
                  let user = res.data;
                  console.log(user);
                  this.setState({
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        city: user.city,
                        state_code: user.state,
                        role: user.role

                  });
                  
            });
    }

        
    }
    saveUser = (e) => {
        e.preventDefault();
        let user = { username: this.state.username, password: this.state.password, 
            email: this.state.email,phone:this.state.phone, city: this.state.city, role: this.state.role, state: this.state.state_code,enabled:true };
        
            UserService.addUser(user).then(res =>{
                this.props.history.push('/product');
            }).catch(error => {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
        });
            console.log("Add user");

        }


    cancel() {
        this.props.history.push('/user');
    }

    getTitle() {
        if (this.state.id == -1) {
            return <h3 className='text-center'>Add User</h3>

        }
        else {
            return <h3 className='text-center'>Update User</h3>
        }
    }

    render() {

          let enabled=true;
          if(this.state.id==-1)
                enabled=false;

        return (
            <div className='content' >

                <div className='cardUserView'>
                    <div className='row'>
                        <div className='card col-md-12  '>
                            {this.getTitle()}
                            <div className='card-body'>
                                <form>

                                    <div className="row mb-3">

                                        <div className='col'>

                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > Type</label>
                                                </div>
                                                <div className='col-9'>
                                                    <Select
                                                        value={options.filter(({ value }) => value === this.state.role)}
                                                        onChange={this.handleChange}
                                                        options={options}
                                                        isDisabled={enabled}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > User Name</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input placeholder='User Name' name="username" className='form-control'
                                                        readOnly = {enabled} value={this.state.username} onChange={this.changeUsernameHandler} />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > Password</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type="password" placeholder='Password' name="password" className='form-control'
                                                        readOnly = {enabled} value={this.state.password} onChange={this.changePasswordHandler} />
                                                </div>
                                            </div>


                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > Email</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type="email" placeholder='Email' name="email" className='form-control'
                                                        value={this.state.email} onChange={this.changeEmailHandler} />
                                                </div>
                                            </div>


                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > Phone</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input  type="number" placeholder='Phone no (10 digit)' name="phone" className='form-control'
                                                           value={this.state.phone} onChange={this.changePhoneHandler} />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > City</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input placeholder='City' name="city" className='form-control'
                                                        value={this.state.city} onChange={this.changeCityHandler} />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > State</label>
                                                </div>
                                                <div className='col-9'>
                                                    <Select
                                                        value={this.state.stateCombo.filter(({ value }) => value === this.state.state_code)}
                                                        onChange={this.handleChangeState}
                                                        options={this.state.stateCombo} />  
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className='col'>
                                                    <button className='btn btn-success' style={{ marginLeft: "150px", marginTop: "10px" }} onClick={this.saveUser}>Save</button>
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

export default CreateUserComponent;