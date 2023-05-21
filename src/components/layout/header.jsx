import './header.css'
import { BsCloudSun } from 'react-icons/bs'

import React from 'react'

function Header() {
    return (
        <header className='header'>
            <div className='icon-cloud'>
                <BsCloudSun size={60}/>
            </div>
            <div>
                <h1>Forecast Now</h1>
            </div>
        </header>
    )
}

export default Header