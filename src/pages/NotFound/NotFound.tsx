import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Not Found</h2>
      <Link to='/' className='nav-link'>
        Go back Home
      </Link>
    </div>
  )
}

export default NotFound
