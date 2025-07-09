import styled from "styled-components";

export const HeaderStyled = styled.header`
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`


export const HeaderDivStyled = styled.div`
    display: flex;
    justify-content: space-around;
    width: 80%;
    border-top: 0;
    padding: 1%;
    border-radius: 0 0 12px 12px;
    background-color: rgba(255, 255, 255, 0.273);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3)
    , 0 6px 20px rgba(0, 0, 0, 0.1);
    color: black;
`