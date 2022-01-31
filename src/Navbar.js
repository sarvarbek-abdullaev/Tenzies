import React from 'react'

export default function Navbar(props) {
    return (
        <div className='Navbar'>
        <ul>
          <li onClick={props.makeAllWhite} className='active'><a className='navbar-icon' href='#'>Practice</a></li>
          <li><a className='navbar-icon' href='#'>Game</a></li>
          <li><a className='navbar-icon' href='#'>Records</a></li>
        </ul>
      </div>
    )
}