import React, { Component } from 'react'
import actions from '../services/index'

class UserSearch extends Component {

    state = {}

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmitName = e => {
        e.preventDefault()
    }

    handleSubmitJob = e => {
        e.preventDefault()
        let search;
        let queStr;
        if (this.state.job.includes(' ')) {
            search = this.state.job.split(' ')
            queStr = search.reduce((acc, val, ind) => {
                
                return ind == 0 ? acc += val : acc += '+' + val
            }, '')
        }
        else {
            queStr = this.state.job
        }
        console.log(queStr)
        actions.searchByJobTitle(queStr).then(res => console.log(res))
    }


    render() {
        return (
            <div>
                <form>
                    <input type="text" name="name" placeholder='e.q. John Smith' />
                    <input type="submit" />
                </form>
                <form onSubmit={this.handleSubmitJob}>
                    <input onChange={this.handleChange} type="text" name="job" placeholder='e.q. John Smith' />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default UserSearch