import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ClientForm = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", image);
    formData.append("uploadDate", new Date().toISOString());
    const response = await axios.post(
      "https://docsubmission.onrender.com/api/file/add",
      formData
    );
    if (response.data.success) {
      setData({
        name: "",
      });
      setImage(false);
      toast.success(response.data.message);
      navigate("/");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Document Upload
      </h1>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="mb-5">
          <label
            htmlFor="documentName"
            className="block text-gray-700 font-medium mb-2"
          >
            Your Name
          </label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="file"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload File
          </label>
          <label
            htmlFor="image"
            className="block text-gray-700 font-medium mb-2"
          >
            <img src={image ? URL.createObjectURL(image) : " "} alt="" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            required
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
