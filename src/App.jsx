import { useReducer, useState } from 'react';
import './App.css'
import CreateEvent from './components/CreateEvent'
import Listing from './components/Listing'
import Popup from './components/Popup';
import { Toaster } from '@/components/ui/toaster';

const data = {
  communityId:1,
  communityName:"Delhi NCR",
  communityDetails: "Welcome to the tribe",
  events:[
    // {
    //   title:"Saturday Run week-11",
    //   startTime:"Tomorrow 7:00 AM",
    //   img:"",
    //   endTime:"",
    //   location:"Nehru Park",
    //   description:""
    // },
    // {
    //   title:"Saturday Run week-11",
    //   startTime:"Tomorrow 7:00 AM",
    //   img:"",
    //   endTime:"",
    //   location:"Nehru Park",
    //   description:""
    // },
    // {
    //   title:"Saturday Run week-11",
    //   startTime:"Tomorrow 7:00 AM",
    //   img:"",
    //   endTime:"",
    //   location:"Nehru Park",
    //   description:""
    // },
    // {
    //   title:"Saturday Run week-11",
    //   startTime:"Tomorrow 7:00 AM",
    //   img:"",
    //   endTime:"",
    //   location:"Nehru Park",
    //   description:""
    // },
    // {
    //   title:"Saturday Run week-11",
    //   startTime:"Tomorrow 7:00 AM",
    //   img:"",
    //   endTime:"",
    //   location:"Nehru Park",
    //   description:""
    // },
    // {
    //   title:"Saturday Run week-11",
    //   startTime:"Tomorrow 7:00 AM",
    //   img:"",
    //   endTime:"",
    //   location:"Nehru Park",
    //   description:""
    // },
    // {
    //   title:"Saturday Run week-11",
    //   startTime:"Tomorrow 7:00 AM",
    //   img:"",
    //   endTime:"",
    //   location:"Nehru Park",
    //   description:""
    // },
    // {
    //   title:"Saturday Run week-11",
    //   startTime:"Tomorrow 7:00 AM",
    //   img:"",
    //   endTime:"",
    //   location:"Nehru Park",
    //   description:""
    // }
  ]
  
}

function App() {

  const [data, setData] = useState(() => JSON.parse(localStorage.getItem("data") || '{"communityId":1,"communityName":"Delhi NCR","communityDetails": "Welcome to the tribe","events":[]}'));
  const [isOpen, setIsOpen] = useReducer((s)=>!s, false);

  const addEvent=(event)=>{
    const newData = data;
    newData?.events.push(event);
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData))
  }

    console.log(data);
  
  

  return (
    <div >
     <Listing
     data={data}
     setIsOpen={setIsOpen}
     /> 
     <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
        <CreateEvent
        addEvent={addEvent}
        />
      </Popup>
     
    </div>
  )
}

export default App
