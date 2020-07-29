import React, { Component } from 'react';
import Navbar from '../Navbar'
import '../../styles/Profile.css'

const Profile = (props) => {
    console.log(props.user.user.email)
    if (!props.user.user.email) {
        props.history.push('/log-in')
    }
    return (
        <div>
            <Navbar />
            <div id='user_info'>
                <h1>{props.user.user.name}</h1>
                <strong>{props.user.user.email}</strong>
            </div>
        </div>
    );
}

export default Profile;