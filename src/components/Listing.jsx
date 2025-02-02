import { faClock, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const Listing = ({data,setIsOpen}) => {
  return (
    <div className='flex justify-center flex-col p-4'>
        <div className='flex justify-between mb-8'>
            <div>
                <h1 className='font-bold text-2xl'>{data?.communityName}</h1>
                <h3>{data?.communityDetails}</h3>
            </div>
            <button 
            onClick={()=>setIsOpen()}
            className='bg-blue-700 rounded-md px-4 text-white font-bold'>
                Create Event
            </button>
        </div>
        {Array?.isArray(data?.events) && data?.events?.length ==0 &&
        <div>No Events Available</div>
        }
        <div className='flex  gap-4 flex-wrap'>
            {Array.isArray(data?.events) && data?.events?.length>0 &&
                data?.events?.map((item,idx)=>{
                    // let date = '',ms=Math.abs(new Date(item?.startDate)-new Date());
                    // let days = Math.floor(ms / (1000 * 60 * 60 * 24));
                    // console.log(days);
                    const date = new Date(item?.startDate);
                    // const yyyy = today.getFullYear();
                    let mm = date.getMonth() + 1; // Months start at 0!
                    let dd = date.getDate();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;

                    const formattedDate = dd + '/' + mm + '  ' + date.toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                  });;

                    return <div key={idx} className='w-[150px] h-[220px] my-4'>
                        <img className='w-100 rounded-xl bg-black'  src={item?.imageContent || 'src/assets/react.svg'} alt='event image'/>
                        <h2 className='font-bold'>{item?.title}</h2>
                        <p className='text-sm'><FontAwesomeIcon icon={faClock} size='xs'/>{" "+formattedDate}</p>
                        <p className='text-sm'><FontAwesomeIcon icon={faMapPin} /> {" "+item?.location?.value?.structured_formatting?.main_text}</p>
                    </div>;
                })
            }
        </div>
    </div>
  )
}

export default Listing