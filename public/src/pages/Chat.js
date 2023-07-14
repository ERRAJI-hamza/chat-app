import React ,{useEffect, useState,useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import say_logo from '../images/say_logo.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute ,host} from "../Api/ApiRoute.js";
import axios from 'axios';
import { Contacts } from '../components/Contacts.js';
import { ContainerChat } from '../components/ContainerChat.js';
import { io } from "socket.io-client";

export const Chat = () => {
  const [currentContact,setCurrentContact]=useState();
  const [user,setUser]=useState(undefined);
  const socket = useRef();
  const socketUser = async () =>{
      const u = await JSON.parse(
           localStorage.getItem("current-user")
          );
      setUser(u);
  }
  useEffect(() => {
     socketUser();
  }, []);

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  return (
        <>
          <Container>
            <div className='container'>
               <Contacts setCurrentContact={setCurrentContact}/>
               <ContainerChat currentContact={currentContact} socket={socket}/>
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
