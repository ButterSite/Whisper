import styled from "styled-components";


export const LoginRegisterSection = styled.section`
  display: flex;
  justify-content: center;
`;

export const LoginRegisterContainer = styled.div`
  margin: 3.5%;
  opacity: 0;
  animation: showUp 0.6s ease-in forwards;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.3), 0 3px 20px rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: space-around;
  border-radius: 12px;
  height: 50vh;
  width: 80vw;
  background: linear-gradient(70deg, white 50%, black 50%);
  &
  @keyframes showUp {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const LoginContainer = styled(InputContainer)`
`;

export const PgpKeyTextarea = styled.textarea`
  border-radius: 1%;
  border: solid 0.1em;
  vertical-align: top;
  height: 20vh;
  width: 100%;
  line-height: 1.2;
  padding: 5px 10px;
`;

export const PgpMessageTextarea = styled(PgpKeyTextarea)`
  color: white;
  background-color: transparent ;
  border: solid white 0.1em;
  height: 50%;
`;

export const Input = styled.input`
  color: black;
  background: transparent;
  padding: 1%;
  border: 0;
  border-bottom: solid 0.1em;
  font-size: larger;
  margin: 2% 0;
  width: 100%;
`;

export const LoginInput = styled(Input)`
  color: white;
  border-bottom: white solid 0.1em;
`;

export const SignButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignButton = styled.button`
  transition: all 0.2s;
  cursor: pointer;
  border-style: none;
  color: white;
  width: 50%;
  padding: 3%;
  margin-top: 5%;
  margin-left: auto;
  border-radius: 5%;
  background-color: black;
  &:hover {
    transform: scale(105%);
  }
`;

export const SignInButton = styled(SignButton)`
  color: black;
  background-color: white;
`;

export const DoneButton = styled(SignInButton)`
  width: 20%;
  height: 50%;
  padding: 1%;
`;

export const SignUpText = styled.h2`
  text-align: center;
  color: black;
`;

export const SignInText = styled.h2`
  text-align: center;
  color: white;
`;


export const ErrorText = styled.div`
    color: red;
    margin: 1%;
    font-size: 12px;
`
