import React, { useState, useEffect } from 'react'
import actions from '../services/index'

const Connections = props => {

    const [connectionsList, setCL] = useState([])

    useEffect(() => {
        actions.getConnections(props.userId).then(res => setCL(res.data.connections))
    }, [])

    const displayConnections = () => {
        return connectionsList.map((user, i) => {
            return (
                <div>
                    <div key={i} id="showUser" className="eachJob">
                        <div
                            className="data-logo info3"
                        >
                            {user.image == null ? (
                                <img
                                    id="borderImg"
                                    // onClick={this.showLoad}
                                    className="about-logo"
                                    src={require("../images/userPic.png")}
                                    alt="profileImage"
                                />
                            ) : (
                                    <img
                                        id="borderImg"
                                        // onClick={this.showLoad}
                                        className="about-logo"
                                        src={user.image}
                                        alt="profileImage"
                                    />
                                )}
                        </div>
                        <div className="users5">
                            <h1>
                                {user.firstName} {user.lastName}
                            </h1>
                            <p>{user.jobTitle}</p>
                            <div id="contact6" className="contact3">
                                <img
                                    className="contact2"
                                    src={require("../images/phone.png")}
                                    alt="phone"
                                />
                                <div>{user.phoneNum}</div>
                            </div>
                            <div
                                onClick={() => this.showEmail(user.email)}
                                id="contact6"
                                className="contact3"
                            >
                                <div className="emailMe">Contact</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            {displayConnections()}
        </div>
    )
}

export default Connections