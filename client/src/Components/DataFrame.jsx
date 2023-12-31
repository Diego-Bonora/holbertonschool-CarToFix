import React from 'react'

export default function DataFrame({ title, level }) {
  return (
    <>
      <div className='col-span-1 w-60 py-4 translate-y-5 flex my-4 flex-col justify-center items-center bg-[#09B6C2] gap-y-3 rounded-lg text-white'>
        <spam className="text-center text-lg font-bold md:w-32">{title}</spam>
        <h2 className="text-center text-3xl font-black"> {level}</h2>
      </div>
    </>

  )
}