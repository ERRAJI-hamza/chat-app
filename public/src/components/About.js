import React ,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import say_logo from '../images/say_logo.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { categoriesRoute} from "../Api/ApiRoute.js";

export const About = ({values}) => {
    const [sport , setSport] = useState();
    const [club , setClub] = useState();
    const [specaility , setSpecaility] = useState();
    const [subject , setSubject] = useState();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const handlSubmit = async (event) => {
        event.preventDefault();
        const user = await JSON.parse(
            localStorage.getItem("current-user")
          );
        const { data } = await axios.post(`${categoriesRoute}/${user._id}`,{
            categories:[sport,club,specaility,subject]
        });

        if (data.isSet) {
            user.categories = data.categories;
            localStorage.setItem(
                "current-user",
              JSON.stringify(user)
            );
            values(user);
          } else {
            toast.error("Error setting question. Please try again.", toastOptions);
          }

    }

 /*useEffect(() => {
    if (localStorage.getItem("current-user")) {
      console.log(localStorage.getItem("current-user"));
      navigate("/");
    }
  }, []);*/


  return (
    <FormContainer>
        <form onSubmit={(event) => {handlSubmit(event)}}>
            <div className='brand'>
                  <h1>About you</h1>
            </div>
            <input 
              type="text" 
              placeholder="your favorite sport"
              value={sport}
              onChange={(e) =>setSport(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="your favorite club"
              value={club}
              onChange={(e) =>setClub(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="your specaility"
              value={specaility}
              onChange={(e) =>setSpecaility(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="your favorite subject"
              value={subject}
              onChange={(e) =>setSubject(e.target.value)}
            />
            <button type='submit'> send </button>
        </form>
    </FormContainer>
  )
}


const FormContainer = styled.div`
       display : flex;
       flex-direction:column;
       justify-content: center;
       flex-grow: 1;
       padding:0rem 15rem 1rem 15rem;
       .brand{
        display : flex;
        justify-content: center;
        align-items: center;
        h1{
            color:white;
        }
       }
       form{
        display : flex;
        flex-direction:column;
        border-radius : 2rem;
        gap : 1.1rem;
        padding : 2rem 5rem;
        border : 2px solid black;
        background-color: #00000076;
        
        input {
            background-color: transparent;
            padding: 0.8rem;
            font-size: 1.1rem;
            border-radius: 0.4rem;
            border: 0.1rem solid #5c5b5d;
            color: white;
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
       }
`;