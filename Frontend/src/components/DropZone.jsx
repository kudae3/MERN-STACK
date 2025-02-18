import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DropZone = ({ onFileChange }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Clear previous error
    setError('');

    // Handle rejected files (non-image files)
    if (rejectedFiles.length > 0) {
      setError('Only image files are allowed (e.g., JPG, PNG, GIF).');
      return; // Stop further processing
    }

    // Create preview URLs for accepted files
    const filesWithPreview = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));

    setFiles(filesWithPreview);
    onFileChange(filesWithPreview);
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'] // Specify allowed image types
    },
    multiple: false // Set to true if you want multiple files
  });

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileChange(newFiles);
    URL.revokeObjectURL(files[index].preview); // Clean up memory
  };

  // Clean up preview URLs when component unmounts
  React.useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div>
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer ${
          isDragActive ? 'bg-gray-50' : 'bg-white'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600">Drop the image here...</p>
        ) : (
          <p className="text-gray-600">Drag and drop an image here, or click to select</p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      {/* Preview Section */}
      {files.length > 0 && (
        <div className="mt-5">
          {files.map((file, index) => (
            <div key={file.name} className="relative inline-block">
              {/* Image Preview */}
              <img
                src={file.preview}
                alt={file.name}
                className="w-48 h-48 object-cover m-2 rounded-lg"
              />
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropZone;