import React, { Component, Fragment } from 'react';
import actions from '../../services/index'
import '../../styles/LogIn.css'

class LogIn extends Component {

    state = {

    }
    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        actions.logIn(this.state).then(async user => {
            await this.props.setUser({ ...user.data })
            this.props.history.push('/profile')
        }).catch(({ response }) => console.error(response));
    }
    render() {
        return (
            <div id='login_div'>
                <h2>LogIn</h2>
                <form onSubmit={this.handleSubmit}>
                    <label for='email'>Email Address</label>
                    <br />
                    <input id='email' name="email" type="email" onChange={this.handleChange} />
                    <br />
                    <label for='Password'>Password</label>
                    <br />
                    <input id='password' name="password" type="password" onChange={this.handleChange} />
                    <br />
                    <input type="submit" value="Log In" />
                </form>
            </div>
        );
    }
}

export default LogIn;