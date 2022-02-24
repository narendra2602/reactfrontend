import React, { Component } from 'react';
import Select from 'react-select';
import StateService from '../services/StateService';
import UserService from '../services/UserService';
const options = [{ "value": "CF", "label": "C&F" }, { "value": "FS", "label": "FS" }, { "value": "Stockiest", "label": "Stockiest" }];
const hoCombo = [{ "value": 99, "label": "HO" }];
let linkStyleFS = {};
let linkStyleCF = {};
let linkStyleSpan={display: "none"};
let linkStyleName={};
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
            hocode: '',
            cfcode: '',
            fscode: '',
            stkcode: '',
            role: '',
            common_code: '',
            name: '',
            stateCombo: [],
            cfCombo: [],
            fsCombo: []



        }
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCFCombo = this.handleChangeCFCombo.bind(this);
        this.handleChangeFsCombo = this.handleChangeFsCombo.bind(this);
        this.handleChangehoCombo = this.handleChangehoCombo.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCodeHandler = this.changeCodeHandler.bind(this);

        this.codeInput = React.createRef();

    }

    handleChange = selectedOption => {
        this.setState({ role: selectedOption.value });
        if (selectedOption.value === 'CF') {
            linkStyleCF = { display: "none" };
            linkStyleFS = { display: "none" };
        }
        else if (selectedOption.value === 'FS') {
            linkStyleCF = {};
            linkStyleFS = { display: "none" };
        }
        else {
            linkStyleCF = {};
            linkStyleFS = {};
        }

    };


    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
        console.log('value of stkcode is ' + this.state.stkcode);
        console.log('value of CFcode is ' + this.state.cfcode);
        console.log('value of fscode is ' + this.state.fscode);
    }
    changeCodeHandler = (event) => {
        this.setState({
            common_code: event.target.value,
            stkcode: this.state.role === 'Stockiest' ? event.target.value : '',
            cfcode: this.state.role === 'CF' ? event.target.value : '',
            fscode: this.state.role === 'FS' ? event.target.value : '',
            name: ''
        });


    }

    lostCodeFocus = (event) => {
        let code = event.target.value;
        console.log("code is " + code);
        if (code != '') {
            UserService.checkCodeExists(code).then(res => {
                if (res.data.Found) {
                    this.codeInput.current.focus();
                    this.setState({common_code: ''});
                    linkStyleName = {display: "none"};
                    linkStyleSpan = {};

                }
            });
        }
    }
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
        if (event.target.value.length == 11) return false;
        this.setState({ phone: event.target.value });
    }

    handleChangeState = selectedOption => {
        this.setState({
            state_code: selectedOption.value,
            cfCombo: [],
            fsCombo: []
        });


        if (this.state.role === 'Stockiest' || this.state.role === 'FS') {
            UserService.getRoleCombo(selectedOption.value, 'CF').then(res => {
                this.setState({ cfCombo: res.data });
            });

        }

        if (this.state.role === 'Stockiest') {
            UserService.getRoleCombo(selectedOption.value, "Fs").then(res => {
                this.setState({ fsCombo: res.data });
                console.log(res.data);
            });

        }




    }


    handleChangeCFCombo = selectedOption => {
        this.setState({ cfcode: selectedOption.value });
        console.log(selectedOption.value);
    }


    handleChangeFsCombo = selectedOption => {
        this.setState({ fscode: selectedOption.value });
        console.log(selectedOption.value);
    }

    handleChangehoCombo = selectedOption => {
        this.setState({ hocode: selectedOption.value });
    };

    componentDidMount() {
        StateService.getStateList().then(res => {
            this.setState({ stateCombo: res.data });
        }).catch(error => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        });

        if (this.state.id == -1) {
            return;
        }
        else {
            UserService.getUserById(this.state.id).then(res => {
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
        let user = {
            username: this.state.username, password: this.state.password,
            email: this.state.email, phone: this.state.phone, city: this.state.city,
            role: this.state.role, state: this.state.state_code, enabled: true,
            cfcode: this.state.cfcode, fscode: this.state.fscode, stkcode: this.state.stkcode,
            hocode: this.state.hocode, name: this.state.name
        };


        UserService.addUser(user).then(res => {
            this.props.history.push('/user');
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

        let enabled = true;
        if (this.state.id == -1)
            enabled = false;

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
                                                    <label className="form-label" > Role</label>
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
                                                    <label className="form-label" > Code & Name</label>
                                                </div>
                                                <div className='col-3'>
                                                    <input placeholder='Code' name="common_code" className='form-control'
                                                        ref={this.codeInput} readOnly={enabled} value={this.state.common_code} onBlur={this.lostCodeFocus} onChange={this.changeCodeHandler} />
                                                </div>

                                                <div className='col-6' style={linkStyleName}>
                                                    <input placeholder='Name' name="name" className='form-control'
                                                        readOnly={enabled} value={this.state.name} onChange={this.changeNameHandler} />
                                                </div>
                                                <div className='col-6' style={linkStyleSpan}>
                                                    <span>Code Already Exists</span>
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
                                                <div className='col-3'>
                                                    <label className="form-label" > HO</label>
                                                </div>
                                                <div className='col-9'>
                                                    <Select
                                                        value={hoCombo.filter(({ value }) => value === this.state.hocode)}
                                                        onChange={this.handleChangehoCombo}
                                                        options={hoCombo}
                                                        isDisabled={enabled}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3" style={linkStyleCF}>
                                                <div className='col-3'>
                                                    <label className="form-label" > CF</label>
                                                </div>
                                                <div className='col-9'>
                                                    <Select
                                                        value={this.state.cfCombo.filter(({ value }) => value === this.state.cfcode)}
                                                        onChange={this.handleChangeCFCombo}
                                                        options={this.state.cfCombo}
                                                        isDisabled={enabled}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3" style={linkStyleFS}>
                                                <div className='col-3'>
                                                    <label className="form-label"> FS</label>
                                                </div>
                                                <div className='col-9'>
                                                    <Select
                                                        value={this.state.fsCombo.filter(({ value }) => value === this.state.fscode)}
                                                        onChange={this.handleChangeFsCombo}
                                                        options={this.state.fsCombo}
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
                                                        readOnly={enabled} value={this.state.username} onChange={this.changeUsernameHandler} />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className='col-3'>
                                                    <label className="form-label" > Password</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type="password" placeholder='Password' name="password" className='form-control'
                                                        readOnly={enabled} value={this.state.password} onChange={this.changePasswordHandler} />
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
                                                    <input type="number" placeholder='Phone no (10 digit)' name="phone" className='form-control'
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