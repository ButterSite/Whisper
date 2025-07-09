import styled from "styled-components";


export const FriendContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 14px;
    background-color: rgba(0, 0, 0, 0.293);
    padding: 4%;
    width: 50%;
    height: 10%;
    border: 3px  solid ;
    color: white;
`

export const NoFriendsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: larger;
    width: 100%
`


export const FriendInfo = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;`

export const Recipients = styled.div`
    padding-top: 5%;
    overflow-y: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 4%;`