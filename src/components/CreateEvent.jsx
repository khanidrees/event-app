import  { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useFilePicker } from 'use-file-picker';
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from 'use-file-picker/validators';
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faChevronUp, faLocationDot, faPen } from '@fortawesome/free-solid-svg-icons';
import { Textarea } from '@/components/ui/textarea';
import FilePicker from './FilePicker';
import DateTimePicker from 'react-datetime-picker';
import PlacesAutocomplete from './PlacesAutocomplete';

import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const containerStyle = {
    width: '100%',
    height: '200px',
    marginTop: '24px',
  }
const libraries = ["places"];


const communities = ["c1", "c2", "c3"];

const CreateEvent = ({addEvent}) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
        libraries:libraries
    })
    const { openFilePicker, filesContent, loading, errors:fileErr } = useFilePicker({
        readAs: 'DataURL',
        accept: ['image/*', 'video/*'],
        multiple: false,
        validators: [
          new FileAmountLimitValidator({ max: 1 }),
          new FileTypeValidator(['jpg', 'png', 'gif', 'webp', 'mp4', 'avi', 'webm']),
          new FileSizeValidator({ maxFileSize: 200 * 1024  /* 50 MB */ }),
        //   new ImageDimensionsValidator({
        //     maxHeight: 900, // in pixels
        //     maxWidth: 1600,
        //     minHeight: 600,
        //     minWidth: 768,
        //   }),
        ],
        onFilesSelected:(data)=>{
            console.log(data);
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = (img.width / 4) * 5;
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
                setFormData((prev)=>({...prev,["imageContent"]:canvas.toDataURL("image/webp",0.6)}));
            }
            img.src=data?.filesContent?.[0]?.content;
        }
      });
    
    // console.log(fileErr?.[0]?.name + ": "+fileErr?.[0]?.reason);
    // console.log(filesContent)
    const [formData, setFormData] = useState({
        imageContent:'',
        community:communities?.[0],
        title:"",
        description:"",
        startDate:new Date(),
        endDate: new Date(),//add 2hrs

    });
    console.log(formData?.imageContent);
    const [address, setAddress] = useState("");

    const [errors, setErrors] = useState({})
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    
    
    const [descFlag, setDescFlag] = useState(false);

    const onChangeHandler = (value)=>{
        // console.log(value);
        setFormData((prev)=>({...prev, "community":value}));
    }
    
    const inputChangeHandler=(name,value)=>{
        console.log(value);
        setFormData((prev)=>({...prev, [name]:value}));
    }

    const endDateChangeHandler=(value)=>{
        if(new Date(value) < new Date(formData?.startDate)){
            console.log("please select end date > start Date")
            return;
        }
        setFormData((prev)=>({...prev, ["endDate"]:value}));
    }

    

    const onSubmit = ()=>{
        // console.log('form submitted');
        // e.preventDefault();
        const errs = validateForm();
        setErrors(errs);
        if(Object.keys(errs).length==0 && fileErr?.length==0){
            
            addEvent({...formData,location: address});
            alert("Event Added successfully");
            // setFormData({
            //     imageContent:'',
            //     community:communities?.[0],
            //     title:"",
            //     description:"",
            //     startDate:new Date(),
            //     endDate: new Date(),//add 2hrs
        
            // })
        }
    }

    const validateForm=()=>{
        let errs = {};
        if(filesContent?.length==0){
            errs.file="Please Select a photo/video";
        }
        if(formData?.title?.length<2){
            errs.title= "title require min 2 chars"
        }
        if(new Date(formData?.endDate) < new Date(formData?.startDate) ){
            errs.endDate="enddate should be after startDate"
        }
        if(address==""){
            errs.location="location is required"
        }
        if(formData?.description?.length < 10){
            errs.description= "description require min 10 chars"
        }
        return errs;
    }

  return (
    <div className='m-4'>
        <h1 className='mt-2 text-center'>Create New Event</h1>
        {/* image picker with custom image */}

        
        <div className="flex flex-col items-center mt-8">
                <FilePicker
                imageContent={formData?.imageContent}
                openFilePicker={openFilePicker}
                />
                {Array.isArray(fileErr) && fileErr?.length>0 &&
                <div className='self-start text-red-400 text-sm'>{fileErr?.[0]?.name + ": "+fileErr?.[0]?.reason}</div>}
                {errors?.file &&
                    <div className='self-start text-red-400 text-sm'>{errors?.file}</div>}
                <div className='w-full flex flex-col items-center mt-6'>
                    <Label className="self-start mb-4">Select Community</Label>
                    <Select 
                    
                    onValueChange={(val)=>onChangeHandler(val)} defaultValue={formData?.community}>
                        
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                        {communities?.map((com,idx)=>{
                            return <SelectItem key={idx} value={com}>{com}</SelectItem>
                        })}
                        </SelectContent>
                    </Select>
                </div>
                <div className='w-full flex flex-col items-center mt-6'>
                    <Label className="self-start mb-4 required">Event Title</Label>
                    <Input type="text" placeholder="Enter Event Title" value={formData?.title} onChange={(e)=>inputChangeHandler("title",e.target.value)}/>
                    {errors?.title &&
                    <div className='self-start text-red-400 text-sm'>{errors?.title}</div>}
                </div>
                
                {/* Time and Date Picker */}
                <div className='w-full flex justify-between mt-6'>
                    <div className='w-1/5 flex items-center justify-between'>
                        <FontAwesomeIcon icon={faChevronUp} />
                        <h3>Starts</h3>
                    </div>
                    
                    <DateTimePicker value={formData?.startDate} onChange={(val)=>inputChangeHandler("startDate",val)} />
                </div>
                <div className='w-full flex justify-between mt-6'>
                    <div className='w-1/5 flex items-center justify-between'>
                        <FontAwesomeIcon icon={faChevronDown} />
                        <h3>Ends</h3>
                    </div>
                    
                    <DateTimePicker value={formData?.endDate} onChange={(val)=>endDateChangeHandler(val)} />
                    {errors?.endDate &&
                    <div className='self-start text-red-400 text-sm'>{errors?.endDate}</div>}
                </div>
                
                {/* Location input */}
                <div className='w-full flex justify-between items-center cursor-pointer mt-6' onClick={()=>setDescFlag(true)}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <div className='w-4/5'>
                        <Label className="required">Choose Location</Label>
                        <PlacesAutocomplete
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                        isLoaded={isLoaded}
                        address={address}
                        setAddress={setAddress}
                        />
                        {/* <Input type="text" placeholder="Enter Event Location" value={formData?.location} onChange={(e)=>inputChangeHandler("location",e.target.value)}/> */}
                        
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                {errors?.location &&
                    <div className='self-start text-red-400 text-sm'>{errors?.location}</div>}
                {coordinates?.lat && coordinates?.lng && isLoaded &&
                    // <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={coordinates}
                    zoom={10}
                    //   onLoad={onLoad}
                    //   onUnmount={onUnmount}
                    >
                        <MarkerF
                        position={coordinates}
                        />
                    </GoogleMap>
                // </div>
                }

                <div className='w-full flex justify-between items-center cursor-pointer mt-6' onClick={()=>setDescFlag(true)}>
                    <FontAwesomeIcon icon={faPen} />
                    <div className='w-4/5'>
                        <Label className="required">Add Description</Label>
                        {descFlag?
                            <Textarea placeholder="Type your message here." value={formData?.description} onChange={(e)=>inputChangeHandler("description",e.target.value)}/>:
                            <p className='text-sm'>add a bried description to let attendees know what your event is all about</p>
                        }
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                {errors?.description &&
                    <div className='self-start text-red-400 text-sm'>{errors?.description}</div>}
            <Button
            onClick={()=>onSubmit()} 
            type="submit" 
            className="bg-blue-700 rounded-full py-4 w-full mt-4">Create Event</Button>
        </div>
    </div>
  )
}

export default CreateEvent