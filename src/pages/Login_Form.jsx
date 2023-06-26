import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import { useMutation } from 'react-query';

export default function Login_Form() {
  //Start of Form Validation & Form Submission
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const mutation = useMutation(formData => {
    return axios.post('http://127.0.0.1:8000/login', formData,{
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
        const response = await mutation.mutateAsync({email, password});
        response.data;
        navigate("/");
    }
  };

  const validate = (email, password) => {
    const errors = {};
    if(!email) {
      errors.email = "Email is required";
    } 
    else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    };
    if (!password) {
      errors.password = "Password is required";
    } 
    else if (password.length < 4) {
      errors.password = "Password must be at least 4 characters";
    }
    else if (!password.match(/[0-9]/)) {
      errors.password = "Password must contain at least one number";
    }
    else if (!password.match(/[a-z]/i)) {
      errors.password = "Password must contain at least one letter";
    };
    return errors;
  };
  //End of Form Validation & Form Submission

  return (
    <>
      <div><h1>Log In</h1></div>
      <form method='POST' onSubmit={handleSubmit} noValidate>
        <div>
        <label>Email</label>
        <input type='email' id="mail" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
        {errors.email && <div className='error'>{errors.email}</div>}
        </div>
        <div>
        <label>Password</label>
        <input type='password' id="pwd" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
        {errors.password && <div className='error'>{errors.password}</div>}
        </div>
        <div style={{ marginTop: '5px' }}>
        <button type='submit' name="btn-send">
        {mutation.isLoading? <div>Please wait...</div>:<div>Proceed</div>}
        </button>
        {mutation.isError && <div>Failed to submit. Try again.</div>}
        {mutation.isSuccess && <div>Logged in Successfully.</div>}
        <div>Not a member yet? <Link to='/Signup_Form'>Sign up</Link></div>
        </div>
      </form>
    </>
  )
}
