import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { roomRoute } from "../Api/ApiRoute.js";
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const Room = () => {
  const [categories,setCategories]=useState();
   
  const navigate =useNavigate();

  const toastStyle={
    position: toast.POSITION.TOP_CENTER,
    autoClose: 4000,
    className: 'toast-message',
    theme:"dark"
     }


     const handlSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            console.log(categories);
            const { data } = await axios.post(roomRoute, {
              categories
            });
            console.log(data);
            if (data.status === false) {
              toast.error(data.message,toastStyle);
            }
            if (data.status === true) {
              console.log(data.usersData);
              localStorage.setItem(
                "Room",
                 JSON.stringify(data.usersData)
              );
              navigate("/chat");
            }
          }
       };

  const handleValidation = () => {

    if (categories === "") {
          toast.error("choose room.", toastStyle);
          return false;
    }
     return true;
   };

  return (
        <>
        <FormRoom>
        <ToastContainer />
        <form onSubmit={(event) => {handlSubmit(event)}}>
            <div className='brand'>
                <h1>Choose categories you want to talk with them</h1>
            </div>
            <input 
              type="text" 
              placeholder="subject...."
              value={categories}
              onChange={(e) =>setCategories(e.target.value)}
            />
            <button type='submit'>go to chat</button>
        </form>
    </FormRoom>  
        </>
  )
}


const FormRoom = styled.div`
    width:100wh;
    height:100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: #131324;
    .brand{
        h1{
            color: white;
        }
    }
    form{
        display:flex;
        justify-content: center;
        flex-direction:column;
        gap : 1.3rem;
        background-color: #00000076;
        padding:1rem;
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

`