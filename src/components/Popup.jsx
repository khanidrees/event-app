
const Popup = ({children, isOpen, setIsOpen }) => {
    {if(isOpen) {
        return <div className='w-full bg-white flex justify-center items-center absolute top-0 left-0 z-10'>
            {/* <div className='content'> */}
                <button className='absolute top-5 right-5' onClick={setIsOpen}>close</button>
                {children}
            {/* </div> */}
            
        </div>
    }
    }  
  
}

export default Popup;