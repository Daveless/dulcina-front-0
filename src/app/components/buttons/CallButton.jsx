"use client"
const CallButton = ({onClick}) => {
  return (
    <button onClick={onClick} type='button' className='bg-[#E60023] font-bold text-[#ffffff] w-[100%] h-[55px] rounded-xl'>
        <p>Añadir al carrito</p>
    </button>
  )
}

export default CallButton