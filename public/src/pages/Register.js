import React ,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import say_logo from '../images/say_logo.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../Api/ApiRoute.js";

export const Register = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmerPwd, setconfirmerPwd] = useState("");
const navigate = useNavigate();

const toastStyle={
       position: toast.POSITION.TOP_CENTER,
       autoClose: 4000,
       className: 'toast-message',
       theme:"dark"
        }

 const handlSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
        const { data } = await axios.post(registerRoute, {
          name,
          email,
          password,
        });
  
        if (data.status === false) {
          toast.error(data.msg);
        }
        if (data.status === true) {
          localStorage.setItem(
            "current-user",
            JSON.stringify(data.user)
          );
          navigate("/profile");
        }
      }
 };

 /*useEffect(() => {
    if (localStorage.getItem("current-user")) {
      navigate("/profile");
    }
  }, []);*/

 const handleValidation = () => {

    if (password !== confirmerPwd) {
      toast.error("Password and confirm password should be same.",toastStyle);
      return false;
    } else if (name.length < 3) {
      toast.error("Username should be greater than 3 characters.",toastStyle);
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be equal or greater than 8 characters.",toastStyle);
      return false;
    } else if (email === "") {
      toast.error("Email is required.",toastStyle);
      return false;
    }
  
    return true;
  };

  return (
    <FormContainer>
        <ToastContainer />
        <form onSubmit={(event) => {handlSubmit(event)}}>
            <div className='brand'>
                  <img src={say_logo} alt=''/>
                  <h1>sayIt</h1>
            </div>
            <input 
              type="text" 
              placeholder="username"
              value={name}
              onChange={(e) =>setName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="email"
              value={email}
              onChange={(e) =>setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="password"
              value={password}
              onChange={(e) =>setPassword(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="confirmer password"
              value={confirmerPwd}
              onChange={(e) =>setconfirmerPwd(e.target.value)}
            />
            <button type='submit'> create user</button>
            <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
    </FormContainer>
  )
}


const FormContainer = styled.div`
       width: 100vw;
       height: 100vh;
       display : flex;
       flex-direction:column;
       justify-content: center;
       align-items: center;
       background-color: #131324;
       .brand{
        display : flex;
        justify-content: center;
        align-items: center;
        gap: 0.2rem;
        img{
            height:3rem;
        }
        h1{
            color:white;
        }
       }
       form{
        display : flex;
        flex-direction:column;
        border-radius : 2rem;
        gap : 1.3rem;
        padding : 3rem 5rem;
        border : 2px solid black;
        background-color: #00000076;
        border: 0.1rem solid white;
        input{
            background-color: transparent;
            padding : 1rem;
            font-size : 1.1rem;
            border-radius : 0.4rem;
            border: 0.1rem solid #5c5b5d;
            color :white;
            &:focus {
                border: 0.2rem solid white;
                outline: none;
              }
        }
        button {
            background-color: #4e0eff;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            &:hover {
              background-color: #4e0eff;
            }
          }
          span {
            color: white;
            text-transform: uppercase;
            a {
              color: #4e0eff;
              text-decoration: none;
              font-weight: bold;
            }
          }
       }
`;