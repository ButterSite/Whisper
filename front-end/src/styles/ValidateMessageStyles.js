import styled from "styled-components";


export const ValidateContainer = styled.div`
    color: black;
    font-size: 24px;
    background-color: rgba(156, 156, 156, 0.462);
    backdrop-filter: blur(5px);
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 50vh;
    width: 60vw;
    border: solid 1px;
    
    & b {
        margin-top:4% ;}`

export const TextAreaContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;`

export const TextArea = styled.textarea`
    padding: 1%;
    border-radius: 12px;
    height: 65%;
    width: 40%;


    &::placeholder {
    font-size: larger;}
`

export const Button = styled.button`
    box-shadow: 1px 1px 10px rgb(255, 255, 255,0.600);
    color: white;
    text-align: center;
    border-radius: 14px;
    border: 2px solid black;
    background: black;
    width: 20%;
    padding: 1%;
    font-size: 20px;
    margin: 3%;
    transition: transform 0.2s;
    display: inline-flex;       
    justify-content: center;    
    align-items: center;
    cursor: pointer;
    &:hover {
    transform: scale(1.1);
    box-shadow: 1px 1px 25px rgb(255, 255, 255,0.600);}`


export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`