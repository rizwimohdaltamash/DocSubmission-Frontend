import React, { useContext, useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { StoreContext } from '../context/StoreContext';

const HomePage = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");  
  const [fetchedData, setFetchedData] = useState(null);
  const { token, setToken } = useContext(StoreContext);

  
  const navigate = useNavigate();

  useEffect(() => {
    // Sync token from localStorage on initial render
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, [setToken]);


  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const ClientForm = () => {
    navigate('/client-form');
  }

  // const fetchList = async () => {
  //   const response = await axios.get('http://localhost:4000/api/docuser/displaydata');
  //   if (response.data.success) {
  //     setList(response.data.data);
  //   } else {
  //     toast.error("Error");
  //   }
  // };
  

  //  useEffect(() => {
  //     fetchList();
  //   }, []);

  // Fetch data from API
  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/docuser/displaydata");
      if (response.data.success) {
        setFetchedData(response.data.data);
      } else {
        alert("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Something went wrong while fetching data.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchList();
  }, []);

  

    // Spring animation
  const welcomeAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div>
      <div className="bg-green-600 p-4 flex justify-between items-center shadow-lg">
        <Link to="/" className="text-white text-2xl font-semibold hover:text-gray-300">
          DocSubmission
        </Link>

        <ul className="flex space-x-6">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={`text-white text-lg hover:text-gray-300 ${menu === "home" ? "font-bold" : ""}`}
          >
            Home
          </Link>
        </ul>

        <div className="flex items-center space-x-4">
          {!token ? (
            <button 
              onClick={() => setShowLogin(true)} 
              className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Sign In
            </button>
          ) : (
            <button 
              onClick={logout} 
              className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div>

</div>

      {/* Centered Button */}
      <div className="flex flex-col justify-center items-center h-screen">
      <animated.h1
          style={welcomeAnimation}
          className="text-4xl font-bold text-green-700 mb-8"
        >
          Welcome, Guest!
        </animated.h1>
       
        <h1 className="mb-4">Submit your document here</h1>
        <button 
          onClick={ClientForm} 
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700"
        >
          Form
        </button>
      
        
      </div>
    </div>
  );
};

export default HomePage;
