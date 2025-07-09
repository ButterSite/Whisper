import styled from 'styled-components';
import { COLORS, SIZES, SHADOWS } from './Constants';

export const BaseContainer = styled.div`
  border-radius: ${SIZES.borderRadius};
  border: solid ${SIZES.borderWidth} ${COLORS.borderColor};
  background-color: ${COLORS.transparentBlack};
  color: ${COLORS.white};
`;

export const ChatSectionContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  height: 100vh;
`;



export const NavigationContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const NavigationList = styled.div`
  list-style: none;
  border-right: solid 3px ${COLORS.borderColor};
  height: 100%;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;


export const WelcomeContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 4%;
`

export const ChatContainer = styled(BaseContainer)`
  display: flex;
  flex-direction: column;
  width: 60vw;
  height: 95vh;
  background: ${COLORS.gradient};
`;

export const MessageContainer = styled.div`
  overflow-y: auto;
  margin-bottom: auto;
`;

export const InputContainer = styled(BaseContainer)`
  border-top: solid ${SIZES.borderWidth} ${COLORS.borderColor};
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const UserSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  gap: 2%;
  width: 100%;
`;

export const FoundedUserContainer = styled(BaseContainer)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4%;
  width: 50%;
  height: 10%;
`;

export const UserInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const EncryptedBoxContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: ${SIZES.fontSizeLarge};
  color: ${COLORS.white};
`;

export const FriendsColumnContainer = styled(EncryptedBoxContainer)`
    margin-top: 80%;
    height: 30%;
    justify-content: space-around;
    width: 90%;
    text-aling: center;
`;

export const FriendsInputContainer = styled.div`
  margin-top: 5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FriendContainer = styled(BaseContainer)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4%;
  width: 50%;
  height: 10%;
  color: ${COLORS.white};
`;

export const NoFriendsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLORS.white};
  font-size: ${SIZES.fontSizeLarge};
  width: 100%;
`;

export const RecipientsContainer = styled.div`
  padding-top: 5%;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4%;
  height: 100%
`;

export const LoginRegisterSection = styled.section`
  display: flex;
  justify-content: center;
`;

export const LoginRegisterContainer = styled.div`
  margin: 3.5%;
  opacity: 0;
  animation: showUp 0.6s ease-in forwards;
  box-shadow: ${SHADOWS.container};
  display: flex;
  justify-content: space-around;
  border-radius: 12px;
  height: 50vh;
  width: 80vw;
  background: ${COLORS.loginGradient};
  @keyframes showUp {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const ValidateContainer = styled.div`
  color: ${COLORS.black};
  font-size: ${SIZES.fontSizeLarge};
  background-color: ${COLORS.grayBackdrop};
  backdrop-filter: blur(5px);
  border-radius: ${SIZES.borderRadius};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50vh;
  width: 60vw;
  border: solid ${SIZES.borderWidth};
  & b {
    margin-top: 4%;
  }
`;

export const TextAreaContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;


export const SignButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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


export const PanelsContainerStyled = styled.div`
    display: flex;
    justify-content: space-around;
    color: black;
`
export const ScrollContainer = styled.div`
    scroll: auto;
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