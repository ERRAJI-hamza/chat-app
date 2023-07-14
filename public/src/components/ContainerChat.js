import React ,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import say_logo from '../images/say_logo.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BiPowerOff } from "react-icons/bi";
import ChatInput from './ChatInput.js';
import { addMessageRoute, getMessagesRoute } from '../Api/ApiRoute.js';

export const ContainerChat = ({currentContact}) => {
  const [messages, setMessages] = useState([]);
  
  const getMessages = async () => {
    const user = await JSON.parse(localStorage.getItem("current-user"))
    const response = await axios.post(getMessagesRoute, {
      from: user?._id,
      to: currentContact?._id,
    });
    setMessages(response.data);
  }

  useEffect(() => {
    getMessages();
   }, [currentContact]);

   const handleSendMsg = async (msg) => {
    console.log(msg);
    const user = await JSON.parse(
      localStorage.getItem("current-user")
    );
   
    await axios.post(addMessageRoute, {
      from: user?._id,
      to: currentContact?._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  return (
        <Container>
            <div className='header'>
              <div className='userdetail'>
                <div className='userImage'>
                    <img
                      src={`data:image/svg+xml;base64,${currentContact?.avatarImage}`}
                      alt="avatar"
                    />
                </div>
                <div className='username'>
                    <h3>{currentContact?.name}</h3>
                </div>
              </div>
              <div className='logout'>
                  <button >
                         <BiPowerOff />
                  </button>
              </div>
            </div>
            {messages.length > 0 ? (
            <div className="chat-messages">
                {messages?.map((message) => {
                      return (
                           <div>
                              <div className={`message ${
                                  message.fromSelf ? "sended" : "recieved"
                                 }`}
                               >
                            <div className="content ">
                                 <span>{message.message}</span>
                            </div>
                           </div>
            </div>
          );
        })}
       </div>): (
              <div className='chatmessage'>
                 <h2>{`hello ${currentContact?.name} !`} </h2>
             </div>)}
    
            <ChatInput handleSendMsg={handleSendMsg}/>
        </Container>
  )
}

const Container = styled.div`
     display: grid;
     grid-template-rows: 10% 80% 10%;
     gap: 0.1rem;
     .header{
        display: flex;
        justify-content: space-between;
        .userdetail{
            display: flex;
            gap: 0.5rem;
            align-items: center;
         .userImage{
            img {
                height: 3rem;
              }
            }
         .username{
            h3{
                color:white;
              } 
            }
        }
        .logout{
            padding-top: 0.6rem;
            margin-right: 0.6rem;
            button{
                background-color: #5f229c;
                border: none;
                cursor: pointer;
                border-radius: 0.3rem;
                padding: 0.3rem;
                svg {
                    font-size: 1.3rem;
                    color: #ebe7ff;
                  }
            }
        } 
     }


     .chatmessage{
        display:flex;
        align-items: center;
        justify-content:center;
        h2{
            color:#bab9bb;
        }
     }

     .chat-messages {
      padding: 1rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      .message {
        display: flex;
        align-items: center;
        
        .content {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          max-width: 50%;
          font-size: 1.1rem;
          border-radius: 0.9rem;
          color: #d1d1d1;
          padding:0.8rem;
        }
      }
      .sended {
        justify-content: flex-end;
        .content {
          background-color:#5f96a2;
        }
      }
      .recieved {
        justify-content: flex-start;
        .content {
          background-color: #9900ff20;
        }
      }
    }
`