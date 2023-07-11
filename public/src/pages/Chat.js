import React ,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import say_logo from '../images/say_logo.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../Api/ApiRoute.js";
import axios from 'axios';
import { Contacts } from '../components/Contacts.js';
import { ContainerChat } from '../components/ContainerChat.js';


export const Chat = () => {
  const [currentContact,setCurrentContact]=useState();
  return (
        <>
          <Container>
            <div className='container'>
               <Contacts setCurrentContact={setCurrentContact}/>
               <ContainerChat currentContact={currentContact}/>
            </div>
          </Container>
        </>
  )
}

const Container = styled.div`
  width:100wh;
  height: 100vh;
  background-color: #131324;
  display: flex;
  justify-content: center;
  align-items: center;
  .container{
      width: 90wh;
      height: 90vh;
      background-color: #00000076;
      display:grid;
      grid-template-columns: 25% 75%;
      gap:0.5rem
  }
`
