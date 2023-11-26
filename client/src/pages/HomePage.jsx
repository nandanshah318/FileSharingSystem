import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [expiryDays, setExpiryDays] = useState(7); // Default expiry days
    const isUserLoggedIn = false; // Replace with actual user authentication status
    const navigate = useNavigate()

    const handleFileUpload = (e) => {
        const files = e.target.files;
    
        // Check if any of the files already exist in the uploadedFiles array
        const duplicateFiles = Array.from(files).filter((file) =>
          uploadedFiles.some((uploadedFile) => uploadedFile.name === file.name)
        );
    
        if (duplicateFiles.length > 0) {
          // Display a warning toast for duplicate files
          toast.warn('Duplicate files are not allowed!', { autoClose: 3000 });
          return;
        }
    
        const updatedFiles = duplicateFiles.length === 0 ? (
          Array.from(files).map((file) => ({
            name: file.name,
            preview: URL.createObjectURL(file),
            expiryDays: expiryDays,
          }))
        ) : [];
    
        setUploadedFiles([...uploadedFiles, ...updatedFiles]);
      };

  const handlePreview = (file) => {
    setSelectedFile(file);
  };

  const handleDelete = (file) => {
    setUploadedFiles(uploadedFiles.filter((uploadedFile) => uploadedFile !== file));
  };

  const handleExpiryChange = (e) => {
    const days = parseInt(e.target.value, 10);
    setExpiryDays(days);
  };

  const handleUploadToBackend = () => {
    // Add your backend upload logic here
    // This is a placeholder function and should be replaced with your actual implementation
    console.log("Uploading files to backend:", uploadedFiles);
    // Reset uploaded files after uploading to backend
    setUploadedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
        <ToastContainer />
      {/* Navbar */}
      <nav className="bg-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center">
            <img
              src="/path/to/your/logo.png" // Replace with the actual path to your logo
              alt="FileHub Logo"
              className="h-8 w-8 mr-2"
            />
            <span className="text-xl font-bold text-gray-800">FileHub </span>
          </div>

          {/* User Status on the right */}
          <div className="text-gray-700">
            {isUserLoggedIn ? (
              <span>Welcome, John Doe</span> // Replace with the actual user's name
            ) : (
              <span onClick={()=>navigate('/signup')}>Guest User</span>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">FileHub </h1>

          {/* Expiry Date Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="expirySelect">
              Set Expiry Date (in days):
            </label>
            <select
              id="expirySelect"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={expiryDays}
              onChange={handleExpiryChange}
            >
              <option value="1">1 day</option>
              <option value="7">1 week</option>
              <option value="30">1 month</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* File Upload Section */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fileInput">
              Select a file to upload:
            </label>
            <div className="relative border border-dashed border-gray-300 rounded-md p-6 flex justify-center items-center">
              <input
                type="file"
                id="fileInput"
                className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                onChange={handleFileUpload}
              />
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 48 48"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v14l-4-4m0 4l4 4m20-8v14l-4-4m0 4l4 4"
                  ></path>
                </svg>
                <p className="mt-1 text-sm text-gray-600">Drag and drop or click to upload</p>
              </div>
            </div>
          </div>

          {/* Ready to Upload Section */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Ready to Upload:</h2>
              <ul className="list-none pl-0">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="text-gray-700 flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-md overflow-hidden hover:bg-gray-200 transition duration-300">
                    <div className="flex items-center space-x-4">
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                      <div>
                        <span className="block text-sm font-semibold">{file.name}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handlePreview(file)}
                            className="text-blue-500 hover:underline focus:outline-none text-sm"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => handleDelete(file)}
                            className="text-red-500 hover:underline focus:outline-none text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm flex w-fit flex-col text-gray-500">
                        <span className='min-w-fit w-20'>Expires in: </span>
                        <span>{file.expiryDays} days</span>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Upload Button */}
              <div className='flex justify-center w-full items-center'>
                <button
                    onClick={handleUploadToBackend}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700"
                >
                    Upload Files
                </button>
                </div>
            </div>
          )}

          {/* Shared Files Section */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Shared Files</h2>
            {/* Display a list of shared files here */}
            {/* You can use a visually appealing card layout for each file */}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-4 rounded-lg">
            <img src={selectedFile.preview} alt={selectedFile.name} className="max-h-80 w-full" />
            <button
              onClick={() => setSelectedFile(null)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
