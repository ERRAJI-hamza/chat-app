import React ,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import say_logo from '../images/say_logo.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const Contacts = ({setCurrentContact}) => {
  const [user, setUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  
  const users = async () => {
      const u = await JSON.parse(localStorage.getItem("Room"));
      setUser(u);
      const currentUser = await JSON.parse(localStorage.getItem("current-user"));
      setCurrentUser(currentUser);
    }
  
  useEffect(() => {
      users();
    }, []);

  return (
    <Container>
      <div className='brand'>
                  <img src={say_logo} alt=''/>
                  <h4>chat</h4>
      </div>
      <div className='contacts'>
            {user?.map((user,index)=>{
                   return(
                    <div
                    className={`user ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                    onClick={() => {setSelectedAvatar(index); setCurrentContact(user)}} >
                    
                    <div className='avatar'>
                    <img
                      src={`data:image/svg+xml;base64,${user.avatarImage}`}
                      alt="avatar"
                      key={user}
                    />
                    </div>

                    <div className='username'> 
                       <h3>{user.name}</h3>
                     </div>

                  </div>
                   )
                  
                 
            })}
      </div>
      <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUser?.name}</h2>
            </div>
      </div>
    </Container> 
  )
}

const Container = styled.div`
 display: grid;
 grid-template-rows: 10% 75% 15%;
 overflow: hidden;
 background-color: #080420;   
 .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding: 0.4rem;
    img {
      height: 2rem;
    }
    h4{
      color: white;
      padding-top: 0.3rem;
    }
  } 
.contacts{
    display:flex;
    flex-direction: column;
    align-items: center;
    gap:0.3rem;
    overflow:auto;
    &::-webkit-scrollbar {
        width: 0.5rem;
        &-thumb {
          background-color:#757476; 
          width: 0.1rem;
        }
      }
    .user{
        display:flex;
        gap:1rem;
        align-items: center;
        min-height:4.4rem;
        border-radius: 0.2rem;
        background-color: #ffffff34;
        width: 100%;
        padding: 0.4rem;
        cursor: pointer;
        .avatar{
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
    .selected {
        background-color: #5f229c;
      }
}
.current-user{
    display:flex;
    gap:1.3rem;
    align-items: center;
    justify-content: center;
        .avatar{
            img {
                height: 3.5rem;
              }
        }
        .username{
            padding-top:0.4rem;
            h2{
                color:white;
            } 
        }
}
`
