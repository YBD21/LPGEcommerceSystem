import React, { useState } from 'react';
import axios from 'axios';

function DemoAdmin() {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setImage({
        file: file,
        data: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  const handleUpload = () => {
    let formData = new FormData();
    formData.append('file', image.file);
    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default DemoAdmin;
