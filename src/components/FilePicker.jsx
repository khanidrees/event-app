
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';

const FilePicker = ({imageContent, openFilePicker}) => {
    
    //   if (loading) {
    //     return <div>Loading...</div>;
    //   }
    
    //   if (errors.length) {
    //     return <div>Error...</div>;
    //   }
    console.log(imageContent);
    
      return (
        <div 
        className='aspect-[4/5] cursor-pointer h-[320px] relative'
        onClick={() => openFilePicker()}
        >
        <img
        className="h-full w-full rounded-2xl bg-blue-200 "
        src={imageContent ? imageContent:'/src/assets/upload-image.webp'}/>
          {/* {filesContent.map((file, index) => (
            <div key={index}>
              <h2>{file.name}</h2>
              <img alt={file.name} src={file.content}></img>
              <br />
            </div>
          ))} */}
          <Button
          className="bg-white text-black absolute bottom-[10px] left-1/2 -translate-x-1/2"
          ><FontAwesomeIcon icon={faFileImage} /> {imageContent ? "Replace Photo": "Add Photo"}</Button>
        </div>
      );
}

export default FilePicker