import { useState } from 'react'

const PreviewImage = ( { file }) => {
    //console.log(file);
    const [pre, setPre] = useState(null);
    

    const reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
            //console.log(reader.result);
            setPre(reader.result);
        }
    }
  return (
    <div>
        {pre ? <img src={pre} alt="preview" width="200" height="400" /> : "Loading..." }
    </div>
  )
}

export default PreviewImage;
