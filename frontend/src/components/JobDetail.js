import React from 'react'
import '../styles/JobDetail.css'

const JobDetail = (props) => {

    const job = { ...props?.currJob }
    console.log(job)
    return (
        <div>
            <h2 id='job_title'>{job?.jobtitle}</h2>
        </div>
    )
}

export default JobDetail;