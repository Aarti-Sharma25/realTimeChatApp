import React from 'react'
import dp from "../assets/dp.png"
function Sender({image,message}) {
  return (
    <div className='w-fit max-w-[500px] px-[20px]   bg-[rgb(23,150,194)] py-[10px] text-white rounded-tr-none rounded-2xl
    relative right-0 ml-auto flex-col gap-[10px]'>
    {image && <img src={image} alt="" className='w-[100px] rounded-lg'/>} 
        {message && <span>{message}</span>}
    </div>
  )
}

export default Sender