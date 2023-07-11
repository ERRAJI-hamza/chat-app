import React, { useEffect, useState } from 'react';
import { Avatar } from './../components/Avatar.js';
import { About } from './../components/About.js';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const [user, setUser] = useState();
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  const profile = async () => {
    const u = await JSON.parse(localStorage.getItem("current-user"));
    setUser(u);
    console.log(u);
    setLoad(true);
  }

  useEffect(() => {
    profile();
  }, []);

  useEffect(() => {
    if (user && user.avatarImage && user.categories && user.categories.length > 0) {
      navigate("/");
    }
  }, [user]);

  return (
    <Container>
        <Avatar values={setUser} />
        <About values={setUser} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap:2rem;
  background-color: #131324;
`;


