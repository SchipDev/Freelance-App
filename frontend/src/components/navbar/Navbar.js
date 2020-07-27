import React from 'react'
import NavIcon from './NavIcon'
import '../../styles/navbar_styles/Navbar.css'
import {Link} from 'react-router-dom'

import profile_icon from '../../images/profile-icon.png'

const Navbar = () => {
    return (
        <nav id='bar'>
            <Link to='/jobs' className='nav_button'>Browse Jobs</Link>
            <Link to='/companies' className='nav_button'>Browse Companies</Link>
            <NavIcon destination='/' icon={profile_icon} />
        </nav>
    )
}

export default Navbar