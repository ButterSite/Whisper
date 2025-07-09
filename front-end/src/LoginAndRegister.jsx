import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  LoginRegisterSection,
  LoginRegisterContainer,
  LoginInputContainer,
  PgpKeyTextarea,
  LoginInput,
  LoginInputWhite,
  SignButtonContainer,
  SignButton,
  SignUpText,
  SignInText,
  ErrorText,
  SignInButton,
} from './styles';
import fetchApi from './assets/apiFetcher';
import { ValidateMessage } from './ValidateMessage';

const signInSchema = Yup.object({
  Username: Yup.string()
    .min(6, `Username must be at least 6 characters!`)
    .max(20, `Username must be at most 20 characters!`)
    .required(`Username is required!`),
});

const signUpSchema = Yup.object({
  Username: Yup.string()
    .min(6, `Username must be at least 6 characters!`)
    .max(20, `Username must be at most 20 characters!`)
    .required(`Username is required!`),
  pgpKeyTextArea: Yup.string()
    .required(`Public key is required!`)
    .min(20, "Public Key must be at least 20 characters!"),
});

export const LoginAndRegisterSection = () => {
  const [showValidateMessage, setShowValidateMessage] = useState(false);
  const [ValidateMessageContent, setValidateMessageContent] = useState(``);
  const [usernameState, setUsernameState] = useState();
  const [apiError, setApiError] = useState({ signUp: ``, signIn: `` });

  const apiFetch = new fetchApi();

  const handleAuth = async (username, publicKey) => {
    const { success, message } = await apiFetch.initAuth(username, publicKey);
    if (!success) {
      if (publicKey) {
        setApiError({ signUp: message, signIn: `` });
      } else {
        setApiError({ signUp: ``, signIn: message });
      }
      return;
    }
    setApiError({ signUp: ``, signIn: `` });
    setValidateMessageContent(message);
    setShowValidateMessage(true);
    setUsernameState(username);
  };

  return (
    <LoginRegisterSection>
      <LoginRegisterContainer>
        {/* Sign Up */}
        <Formik
          initialValues={{ Username: '', pgpKeyTextArea: '' }}
          validationSchema={signUpSchema}
          onSubmit={(values) => {
            handleAuth(values.Username, values.pgpKeyTextArea);
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <LoginInputContainer>
                <SignUpText>Sign up.</SignUpText>
                <Field placeholder="Username" name="Username" as={LoginInput} />
                <Field
                  as={PgpKeyTextarea}
                  name="pgpKeyTextArea"
                  placeholder="Your public PGP key..."
                />
                <SignButtonContainer>
                  <SignButton type="submit">
                    <h1>Sign up</h1>
                  </SignButton>
                </SignButtonContainer>
                {apiError.signUp && <ErrorText>{apiError.signUp}</ErrorText>}
                <ErrorMessage name="pgpKeyTextArea" component={ErrorText} />
                <ErrorMessage name="Username" component={ErrorText} />
              </LoginInputContainer>
            </Form>
          )}
        </Formik>

        {/* Sign In */}
        <Formik
          initialValues={{ Username: '' }}
          validationSchema={signInSchema}
          onSubmit={(values) => {
            handleAuth(values.Username);
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <LoginInputContainer>
                <SignInText>Sign in.</SignInText>
                <Field
                  as={LoginInputWhite}
                  placeholder="Username"
                  name="Username"
                  type="text"
                />
                <SignButtonContainer>
                  <SignInButton type="submit">
                    <h1>Done</h1>
                  </SignInButton>
                </SignButtonContainer>
                {apiError.signIn && <ErrorText>{apiError.signIn}</ErrorText>}
                <ErrorMessage name="Username" component={ErrorText} />
              </LoginInputContainer>
            </Form>
          )}
        </Formik>

        {showValidateMessage && (
          <ValidateMessage
            message={ValidateMessageContent}
            username={usernameState}
            onClose={() => setShowValidateMessage(false)}
          />
        )}
      </LoginRegisterContainer>
    </LoginRegisterSection>
  );
};

export default LoginAndRegisterSection;