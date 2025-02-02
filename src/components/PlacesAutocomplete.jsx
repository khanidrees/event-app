import { useEffect, useRef, useState } from 'react';
import  GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
// import GoogleMapReact from 'google-map-react';
// import Location from './Location';

const PlacesAutocomplete = ({coordinates, setCoordinates, isLoaded, address, setAddress}) => {

    
    const ref = useRef();


    useEffect(()=>{
        if(ref.current){
            const handleSelect = async () => {
                const results = await geocodeByAddress(address?.label);
                const latLng = await getLatLng(results[0]);
                setCoordinates(latLng);
              };
              handleSelect();
        }else{
            ref.current = true;
        }
        
    },[address]);
    console.log(coordinates);
    console.log(address);

    if(!isLoaded){
        return <h3>Loading...</h3>
    }
  return (
    <div>
        <GooglePlacesAutocomplete
        // apiKey={API_KEY} 
        selectProps={{
            address,
            onChange: setAddress,
        
        }}
        />
    </div>
  )
}

export default PlacesAutocomplete;