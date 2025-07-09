import styled from "styled-components";
import { Button } from "./ValidateMessageStyles";

export const FoundedUser = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 14px;
  background-color: rgba(0, 0, 0, 0.293);
  padding: 4%;
  width: 50%;
  height: 10%;
  border: 3px solid;
`;

export const UserInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const PersonAddIcon = styled.span`
  cursor: pointer;
  font-size: 48px;
  padding: 1%;
`;


export const UserSearch = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  gap: 2%;
  width: 100%;
`;

export const SearchInput = styled.input`
  padding: 1%;
  border: solid 1px;
  border-radius: 14px;
  height: 5%;
  width: 50%;
  background-color: rgba(0, 0, 0, 0.293);
  transition: transform 0.2s;
  color: white;
`;

export const SearchButton = styled(Button)`
  border: solid 2px;
  box-shadow: none;
  height: 5%;
  width: 50%;
  &:hover {
    box-shadow: none;
  }
`;