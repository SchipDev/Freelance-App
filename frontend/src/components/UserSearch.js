import React, { Component } from 'react'

class UserSearch extends Component {


    

    render() {
        return (
            <div>
                <form>
                    <input type="text" name="name" placeholder='e.q. John Smith' />
                </form>
                <form>
                    <input type="text" name="job" placeholder='e.q. John Smith' />
                </form>
            </div>
        )
    }
}

export default UserSearch