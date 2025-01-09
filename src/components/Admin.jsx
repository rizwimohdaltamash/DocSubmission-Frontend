import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Admin = () => {
 
  const [list, setList] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null); // State for fullscreen image

  const fetchList = async () => {
    const response = await axios.get('https://docsubmission.onrender.com/api/file/list');
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (fileId) => {
    const response = await axios.post('https://docsubmission.onrender.com/api/file/remove', { id: fileId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Submitted Documents by users
      </h1>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-5 text-gray-200  bg-green-600 p-2 text-sm font-semibold ">
          <span>Sr. No.</span>
          <span>Image</span>
          <span>Name</span>
          <span>Date of Submission</span>
          <span>Action</span>
        </div>
        {/* Table Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center border-t border-gray-200 p-2 text-sm"
          >
            {/* Sr. No. */}
            <div className="text-gray-800">{index + 1}</div>
            {/* Image */}
            <div>
              {/* <img
                src={`http://localhost:4000/images/${item.image}`}
                alt={item.name}
                className="w-[50%] h-[50%] object-cover rounded-md"
              /> */}
              <img
                src={`https://docsubmission.onrender.com/images/${item.image}`}
                alt={item.name}
                className="w-[50%] h-[50%] object-cover rounded-md cursor-pointer"
                onClick={() => handleImageClick(`https://docsubmission.onrender.com/images/${item.image}`)}
              />
            </div>
            {/* Name */}
            <div className="text-gray-800 font-medium">{item.name}</div>

            <div className="text-gray-800 font-medium">{new Date(item.uploadDate).toISOString().split('T')[0]}</div>
            {/* Action */}
            <div>
              <button
                onClick={() => removeFood(item._id)}
                className="text-red-500 hover:underline"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeFullscreen}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen"
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </div>
  );
};

export default Admin;