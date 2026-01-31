"use client";

import React from 'react'
import Toggle from '../DarkLightToggle/DarkLightToggle';

export default function Navbar() {
  return (
    <div className='flex justify-between'>
        <div>
            <h1 className='text-4xl md:text-5xl bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2'>TaskFlow Pro</h1>
            <p className='text-gray-600 dark:text-gray-400'>Organize your life, achieve your goals</p>
        </div>
        <div>
            <Toggle />
        </div>
    </div>
  )
}
