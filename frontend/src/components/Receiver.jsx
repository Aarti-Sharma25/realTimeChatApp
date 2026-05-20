import React from 'react'
import dp from "../assets/dp.png"
function Receiver({image,message}) {
  return (
    <div className='w-fit max-w-[500px] px-[20px]   bg-[rgb(8,147,194)] py-[10px] text-white rounded-tl-none rounded-2xl
        relative left-0  flex-col gap-[10px]'> 
       {image && <img src={image} alt="" className='w-[100px] rounded-lg'/>} 
        {message && <span> {message}</span>}
         </div>
  )
}

export default Receiver