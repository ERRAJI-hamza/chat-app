import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { avatarRoute} from "../Api/ApiRoute.js";
import { Spinner } from "./Spinner.js";


export const Avatar = ({values}) => {
  const api = `https://api.multiavatar.com/`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("current-user")
      );
      const { data } = await axios.post(`${avatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
            "current-user",
          JSON.stringify(user)
        );
        values(user);
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  const chargerAvatar = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));  
    } 
    console.log(data);
    setAvatars(data);
    setIsLoading(false);
}

useEffect(() => {
   chargerAvatar();
  }, []);


  return (
    <>
       {isLoading ? (<Spinner />):(<Container>
          <ToastContainer />
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
        </Container>) }
        
    </>
  )
}


const Container = styled.div`
     display: flex;
     height: 30%;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     gap: 1rem; 
     padding-top: 1rem;
     .title-container {
        h1 {
          color: white;
        }
      }
      .avatars {
        display: flex;
        gap: 2rem;

        .avatar {
          border: 0.4rem solid transparent;
          padding: 0.4rem;
          border-radius: 5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.5s ease-in-out;
          img {
            height: 6rem;
            transition: 0.5s ease-in-out;
          }
        }
        .selected {
          border: 0.4rem solid #4e0eff;
        }
      }
      .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 0.9rem 1.5rem;
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
`;

