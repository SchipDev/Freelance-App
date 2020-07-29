import React from 'react'
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const RatingHist = (props) => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <strong>{props.title}</strong>
            <BarChart
                width={500}
                height={300}
                data={props.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ra" fill="royalblue" />
            </BarChart>
        </div>
    )
}

export default RatingHist