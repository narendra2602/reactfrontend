import React, { Component } from 'react';
import UserService from '../services/UserService';

class ListUserComponent extends Component {

    constructor() {
        super();
        this.state = { users: [] };


    }


    editUser(id)
    {
        console.log("in edit user id is  "+id);
        this.props.history.push(`/add-user/${id}`);
        
    }
    createUser = (e) =>{
        e.preventDefault();
        // window.location.href = "/add-user/-1";
        this.props.history.push('/add-user/-1');
    }


    componentDidMount() {
        UserService.getUserList().then(res => {
            this.setState({ users: res.data });
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
                    <button className='btn btn-primary ' onClick={this.createUser} >+ New User</button>
                </div>

                <h2 className="text-center">User List</h2>
                <div className="row table-container" >
                    <table className="table table-striped table-bordered ">
                        <thead>
                            <tr className='red'>
                                <th>Id</th>
                                <th>Role</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td> {user.id} </td>
                                            <td> {user.role} </td>
                                            <td> {user.username} </td>
                                            <td> {user.email} </td>
                                            <td> {user.phone} </td>
                                            <td> {user.city} </td>
                                            <td> {user.state} </td>
                                            <td style={{ width: "280px" }}>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editUser(user.id)} className='btn btn-outline-primary'>Update</button>
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

export default ListUserComponent;