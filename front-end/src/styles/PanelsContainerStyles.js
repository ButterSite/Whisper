import styled from "styled-components";


export const PanelsContainerStyled = styled.div`
    display: flex;
    justify-content: space-around;
    color: black;
`


export const PanelStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #1C1E26;
    border-radius: 3%;
    padding: 2%;
    background-color: white;
    margin-top: 3%;
    width: 25%;
    box-shadow: 3px 3px 20px rgb(255, 255, 255,0.600);
    opacity: 1;
    visibility: hidden;
    
    

}
    
    &.showUp {
    animation: showUp 0.5s ease-in forwards;
}

    img {
    object-fit: contain;
    width: 50%;
    height: auto;
    margin: 3%;
}
    
    @keyframes showUp {
    from {
        opacity: 0;
        visibility: hidden;
    } to {
        visibility: visible;
        opacity: 1;
    }





`