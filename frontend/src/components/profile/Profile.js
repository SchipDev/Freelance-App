import React, { Component } from 'react';
import Navbar from '../Navbar'
import '../../styles/Profile.css'
import actions from '../../services/index'

// const Profile = (props) => {
//     if (!props.user.user.email) {
//         props.history.push('/log-in')
//     }

//     const handleChange = e => {

//     }

//     return (
//         <div>
//             <Navbar />
//             <div id='user_info'>
//                 <h1>{props.user.user.name}</h1>
//                 <strong>{props.user.user.email}</strong>
//                 <form>
//                     <input type='text' name='summary' />
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Profile;


class Profile extends Component {

    state = {
        user: { ...this.props.user }
    }

    componentDidMount() {
        if (!this.props.user.user.email) {
            this.props.history.push('/log-in')
        }
    }

    compileResume = () => {
        let resume = {
            email: this.props.user.user.email, 
            summary: this.state.summary
        }
        return resume
    }

    handleSubmit = e => {
        e.preventDefault()
        let resume = this.compileResume()
        actions.postResume(resume)
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <Navbar />
                <div id='user_info'>
                    <h1>{this.props.user.user.name}</h1>
                    <strong>{this.props.user.user.email}</strong>
                    <form onSubmit={this.handleSubmit}>
                        <input name='summary' type='text' onChange={this.handleChange} placeholder='Summary' />
                        <br />
                        <input type='submit' />
                    </form>
                </div>
            </div>
        )
    }
}

export default Profile