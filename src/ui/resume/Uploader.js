import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { uploadResume } from '../../api/ResumeService';

const Uploader = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleUpload = async () => {
    if (!file || !category) {
      alert('Please select a file and enter a category');
      return;
    }

    try {
      await uploadData(`${category}/${fileName}`, file, {
        contentType: file.type,
      });
      alert('File uploaded successfully!');
      setFile(null);
      setCategory('');
      setFileName('');

      uploadResume(file, category); //TODO: check this works
    } catch (error) {
      console.error('Error uploading file: ', error);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter category"
        value={category}
        onChange={handleCategoryChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Uploader;
