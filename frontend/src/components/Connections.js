import React, { useState, useEffect } from 'react'
import actions from '../services/index'

const Connections = props => {

    const [connectionsList, setCL] = useState([])

    useEffect(() => {
        actions.getConnections(props.userId).then(res => setCL(res.data.connections))
    }, [])

    const displayConnections = () => {
        return connectionsList.map((user) => {
            return (
                <div>
                    <strong>{user.firstName} {user.lastName}</strong>
                    <p>{user.email}</p>
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