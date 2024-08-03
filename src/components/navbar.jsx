import React from 'react'

function navbar() {
  return (
    <div className='flex p-3 bg-blue-400 justify-between px-16 w-full'>
      <div className="logo font-sans text-white font-bold">
        LOGO
      </div>
      <div className="attributes">
        <ul className="flex gap-5">
            <li className='cursor-pointer text-white font-bold hover:text-gray-200 hover:underline transition-all duration-300'>Home</li>
            <li className='cursor-pointer text-white font-bold hover:text-gray-200 hover:underline transition-all duration-300'>Your todos</li>
        </ul>
      </div>
    </div>
  )
}

export default navbar
