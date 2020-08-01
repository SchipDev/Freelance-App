import React, { Component } from 'react';
import Navbar from '../Navbar'
import '../../styles/Profile.css'
import actions from '../../services/index'
import axios from 'axios'


class Profile extends Component {

    state = {
        user: { ...this.props.user },
        userResume: {},
        isShowingAddWE: false,
        addWEObj: {
            jobTitle: '',
            startDate: '',
            endDate: ''
        },
        isShowingAddSkill: false
    }

    componentDidMount() {
        if (!this.props.user.user.email) {
            this.props.history.push('/log-in')
        }
        if (this.props.user.user.hasResume) {
            axios.get(`http://localhost:5000/get-resume/${this.props.user.user._id}`).then(res => this.setState({ userResume: res.data[0] }))
        }
    }

    compileResume = () => {
        let resume = {
            userId: this.props.user.user._id,
            summary: this.state.summary
        }
        return resume
    }

    //----------------------------------------------------------------------------------------------------


    handleSubmitNewResume = e => {
        e.preventDefault()
        console.log(this.props)
        let resume = this.compileResume()
        actions.postResume(resume).then(res => {
            this.setState({
                userResume: res.data.resume
            })
            this.props.setUser(res.data.user)
        })
    }

    handleSubmitAddWE = e => {
        e.preventDefault()
        let workExp = { ...this.state.addWEObj }
        actions.addWorkExperience(workExp, this.state.userResume?._id).then(res => this.setState({
            userResume: res.data,
            isShowingAddWE: false
        }))
    }

    //----------------------------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------------------------


    handleChange = e => this.setState({ [e.target.name]: e.target.value });
    handleChangeAddWE = e => {
        let newWEObj = { ...this.state.addWEObj }
        switch (e.target.name) {
            case 'jobTitle':
                newWEObj.jobTitle = e.target.value
                break;
            case 'startDate':
                newWEObj.startDate = e.target.value
                break;
            case 'endDate':
                newWEObj.endDate = e.target.value
                break;
        }
        this.setState({
            addWEObj: newWEObj
        })
        console.log(this.state.addWEObj)
    }

    //----------------------------------------------------------------------------------------------------


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

    //----------------------------------------------------------------------------------------------------

    displayWorkExperience = () => {

        let workExp = this.state.userResume?.workExperience?.map((we, ind) => {
            return (
                <div>
                    <strong>{we.jobTitle}</strong>
                    <p>{we.startDate} - {we.endDate}</p>
                    <article>{we.description}</article>
                </div>
            )
        })

        return (
            <div>
                <h2>Work Experience</h2>
                <div>{workExp}</div>
                <button onClick={() => this.setState({ isShowingAddWE: !this.state.isShowingAddWE })}>Add Work Experience</button>
                {this.state.isShowingAddWE ?
                    <form onSubmit={this.handleSubmitAddWE}>
                        <label>Job Title</label> <br />
                        <input onChange={this.handleChangeAddWE} name='jobTitle' type='text' placeholder='Job Title' /> <br />
                        <label>Start Date</label><input onChange={this.handleChangeAddWE} name='startDate' type='text' placeholder='MM/DD/YYYY' />
                        <label>End Date</label><input onChange={this.handleChangeAddWE} name='endDate' type='text' placeholder='MM/DD/YYYY or Present' /><br />
                        <input type='submit' />
                    </form>
                    : ''}
            </div>
        )
    }


    //----------------------------------------------------------------------------------------------------

    displaySkills = () => {
        let skillList = this.state.userResume?.skills?.map((skill, ind) => {
            return (
                <li>{skill}</li>
            )
        })

        return (
            <div>
                <h2>Skills</h2>
                <ul>{skillList}</ul>
                <button onClick={() => this.setState({ isShowingAddSkill: !this.state.isShowingAddSkill })}>Add Skill</button>
                {this.state.isShowingAddSkill ?
                    <form onSubmit={this.handleSubmitNewSkill}>
                        <input onChange={this.handleChange} type='text' name='skillToAdd' placeholder='e.g. Programming' />
                        <input type='submit' />
                    </form>
                    :
                    ''}
            </div>
        )
    }

    handleSubmitNewSkill = e => {
        e.preventDefault()
        console.log(this.state.skillToAdd)
        actions.addSkill({newSkill: this.state.skillToAdd}, this.state.userResume?._id).then(res => {
            this.setState({
                userResume: res.data, 
                isShowingAddSkill: false
            })
        })
    }


    //----------------------------------------------------------------------------------------------------

    displayResume = () => {
        return (
            <div>
                {this.displaySummary()}
                {this.displayWorkExperience()}
                {this.displaySkills()}
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
                    {this.props.user.user.hasResume ? this.displayResume() : this.displayCreateResume()}
                </div>
            </div>
        )
    }
}

export default Profile