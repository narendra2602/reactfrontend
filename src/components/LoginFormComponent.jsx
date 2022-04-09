import React, { Component } from "react";
import alogo from "../assets/images/aris_log1.png";
import LoginService from '../services/LoginService';

class LoginFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            error:""
        };
    }
    handleUsernameChange = event => {
        this.setState({username: event.target.value});
    };
    handlepasswordChange = event => {
        this.setState({password: event.target.value});
    };
    handleSubmit = event => {
        event.preventDefault();
        //console.log(`${this.state.username} ${this.state.password}`);
        let user = {username: this.state.username, password: this.state.password };
        console.log(user);
        LoginService.getAuthenticate(user).then(res => {
          //let user = res.data;
         // console.log(user);
          localStorage.setItem('user',JSON.stringify(res.data));
         // let usr = JSON.parse(localStorage.getItem('user'));
         // console.log("usr "+usr);
          this.props.history.push('/product');
        }).catch(error => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            this.setState({error: "Invalid username and password"});
        });  
        
    };
    render() {
        const { username, password } = this.state;
        return (
              
            <div className='loginForm'>
                <div className='loginTitle'>
                   <img src={alogo} className="logo-img" alt="logo"/>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={this.handleUsernameChange}
                            placeholder='Username/email'
                            required
                        />
                    </div>
                    <br/>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={this.handlepasswordChange}
                            placeholder='Password'
                            required
                        />
                    </div>
                    
                        <button className='loginButton' type="submit">Login</button>
                    
                </form> 
                <div className="card-footer-item-bordered" >
                   <a href="http://google.in" className="footer-link">Forgot Password</a>
                </div>
                <div>{this.state.error}</div>
            </div>
        );
    }
}

export default LoginFormComponent;