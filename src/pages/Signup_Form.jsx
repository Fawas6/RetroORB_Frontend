import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import { useMutation } from 'react-query';

export default function Signup_Form() {
  //Start of Form Validation & Form Submission
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const mutation = useMutation(formData => {
    return axios.post('http://127.0.0.1:8000/register', formData,{
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(firstname, lastname, username, email, password, confirm_password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
        const response = await mutation.mutateAsync({firstname, lastname, username, email, password, confirm_password});
        response.data;
        navigate("/Login_Form");
    }
  };

  const validate = (firstname, lastname, username, email, password, confirm_password) => {
    const errors = {};
    if (!firstname) {
      errors.firstname = "First Name is required";
    } 
    else if(!firstname.match(/^[A-Za-z]+$/)) {
      errors.firstname = "First Name can only contain letters";
    };
    if (!lastname) {
      errors.lastname = "Last Name is required";
    } 
    else if(!lastname.match(/^[A-Za-z]+$/)) {
      errors.lastname = "Last Name can only contain letters";
    };
    if (!username) {
      errors.username = "User Name is required";
    };
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
    if (!confirm_password) {
      errors.confirm_password = "Confirmed Password is required";
    }
    else if (password !== confirm_password) {
      errors.confirm_password = "Passwords must match";
    };
    return errors;
  };
  //End of Form Validation & Form Submission
  const reset_form = () => {
    setFirstname('');
    setLastname('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirm_password('');
  }

  return (
    <>
      <div><h1>Register</h1></div>
      <form method='POST' onSubmit={handleSubmit}>
        <div>
        <label>First Name</label>
        <input type='text' id="txtfirst_name" name="firstname"  value={firstname} onChange={(e) => setFirstname(e.target.value)} required></input>
        {errors.firstname && <div className='error'>{errors.firstname}</div>}
        </div>
        <div>
        <label>Last Name</label>
        <input type='text' id="txtlast_name" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required></input>
        {errors.lastname && <div className='error'>{errors.lastname}</div>}
        </div>
        <div>
        <label>User Name</label>
        <input type='text' id="txtuser_name" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
        {errors.username && <div className='error'>{errors.username}</div>}
        </div>
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
        <div>
        <label>Confirm Password</label>
        <input type='password' id="confirm_pwd" name="confirm_password" value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} required></input>
        {errors.confirm_password && <div className='error'>{errors.confirm_password}</div>}
        </div>
        <div style={{ marginTop: '5px' }}>
        <button type='reset' style={{ marginRight: '2.5px' }} onClick={reset_form}>Reset</button>
        <button type='submit' name="btn-send" style={{ marginLeft: '2.5px' }}>
          {mutation.isLoading? <div>Submitting...</div>:<div>Submit</div>}
        </button>
        </div>
        {mutation.isError && <div>Failed to submit. Try again.</div>}
        {mutation.isSuccess && <div>Successfully submitted.</div>}
        <div>Already have an account?<Link to='/Login_Form'>Log In</Link></div>
      </form>
    </>
  )
}
