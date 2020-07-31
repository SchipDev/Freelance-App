import React, { Component } from 'react';
import Navbar from '../Navbar'
import '../../styles/Profile.css'
import actions from '../../services/index'
import axios from 'axios'

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
        if (this.props.user.user.hasResume) {
            axios.get(`http://localhost:5000/get-resume/${this.props.user.user._id}`).then(res => this.setState({userResume: res.data[0]}))
        }
    }

    compileResume = () => {
        let resume = {
            userId: this.props.user.user._id,
            summary: this.state.summary
        }
        return resume
    }

    handleSubmitNewResume = e => {
        e.preventDefault()
        let resume = this.compileResume()
        actions.postResume(resume).then(res => console.log(res))
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    displayCreateResume = () => {
        return (
            <form onSubmit={this.handleSubmitNewResume}>
                <input name='summary' type='text' onChange={this.handleChange} placeholder='Summary' />
                <br />
                <input type='submit' />
            </form>
        )
    }


    displaySummary = () => {
        return (
            <div>
                <article>{this.state.userResume?.summary}</article>
            </div>
        )
    }



    render() {
        console.log(this.props.user.user.hasResume)
        return (
            <div>
                <Navbar />
                <div id='user_info'>
                    <h1>{this.props.user.user.name}</h1>
                    <strong>{this.props.user.user.email}</strong>
                    {this.props.user.user.hasResume ? this.displaySummary() : this.displayCreateResume()}
                </div>
            </div>
        )
    }
}

export default Profile