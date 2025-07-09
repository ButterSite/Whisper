import styled from "styled-components";
import { Button } from "./ValidateMessageStyles";

export const EncryptedBoxContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: x-large;
  color: white;
`;


export const EncryptedBoxIcon = styled.span`
  font-size: 200px;
  cursor: auto;
`;


export const FriendsInputContainer = styled.div`
  margin-top: 5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


export const EncryptedBoxInput = styled.input`
  width: 80%;
  padding: 2%;
  color: white;
  border: solid 1px;
  border-radius: 14px;
  background-color: rgba(0, 0, 0, 0.293);
`;

export const EncryptedBoxConfirmButton = styled(Button)`
  width: 50%;
  box-shadow: none;
  border: solid 2px;
  margin-top: 10%;
  &:hover {
    box-shadow: none;
  }
`;