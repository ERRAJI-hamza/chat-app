import React from 'react'
import styled from "styled-components";

export const Spinner = () => {
  return (
    <>
    <SpinnerContainer>
  
  <div className="spinner-grow text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-secondary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-success" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-danger" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-warning" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-info" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-light" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-dark" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>


    </SpinnerContainer>
    </>
  )
}

const SpinnerContainer = styled.div`
     display: flex;
     height: 30%;
     justify-content: center;
     align-items: center;
     gap : 1.4 rem;
     background-color: #131324; 
     padding: 2rem;
     .spinner-grow{
          padding : 1.3rem;
          margin:0.5rem;
     }
`