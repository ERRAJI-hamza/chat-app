import React ,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import say_logo from '../images/say_logo.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BiPowerOff } from "react-icons/bi";
import ChatInput from './ChatInput.js';

export const ContainerChat = ({currentContact}) => {
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
            <div className='chatmessage'>
                 <h2>{`hello ${currentContact?.name} !`}</h2>
            </div>
            <ChatInput/>
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
`