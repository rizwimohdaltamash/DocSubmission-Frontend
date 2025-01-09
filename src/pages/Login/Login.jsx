import React, { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const navigate =useNavigate();
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/docuser/login";
    } else {
      newUrl += "/api/docuser/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      navigate("/client-form");
      toast.success("Logged in Succesfully");
    } else {
      // alert(response.data.message);
      toast.error("Failed Login");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={onLogin}
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold ml-40">{currState}</h2>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="flex items-start mt-4">
          <input
            type="checkbox"
            className="h-4 w-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
            required
          />
          <p className="text-sm text-gray-600 ml-2">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="text-green-500 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="text-green-500 hover:underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;

