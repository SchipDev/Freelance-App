import React from 'react'
import '../styles/JobDetail.css'

const JobDetail = (props) => {

    const job = { ...props?.currJob }
    console.log(job)
    return (
        <div id='jobdetail'>
            <h2 id='job_title'>{job?.jobtitle}</h2>
            <p>{job?.formattedLocation} | <span>{job?.company}</span></p>
            {/* <article id='job_desc'>{job?.snippet}</article> */}
        </div>
    )
}

export default JobDetail;


/*
city: "Silver Spring"
company: "US Department of Health And Human Services"
country: "US"
date: "Mon, 13 Jul 2020 15:54:54 GMT"
expired: false
formattedLocation: "Silver Spring, MD"
formattedLocationFull: "Silver Spring, MD"
formattedRelativeTime: "13 days ago"
indeedApply: false
jobkey: "f2e5ab08d5f7221d"
jobtitle: "General Engineer"
language: "en"
latitude: 38.99067
longitude: -77.02609
onmousedown: "indeed_clk(this,'4683');"
refNum: "573346500"
snippet: "Professional registration or licensure - Current registration as an <b>Engineer</b> Intern (EI), <b>Engineer</b> in Training (EIT)1 , or licensure as a Professional <b>Engineer</b> …"
source: "usajobs.gov"
sponsored: false
state: "MD"
stations: ""
*/