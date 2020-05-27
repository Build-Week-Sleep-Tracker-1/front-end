import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { connect } from 'react-redux'; // eloy: added this to hook up state and actions
import { login } from '../actions'; // eloy: added this to hook up state and actions
import axios from 'axios'; // imported axios
import styled from 'styled-components'; 

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  height: 100vh;
`

const OuterDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 1px solid green;
  height: 35%;
  width: 20%;
  border-radius: 5px;
`

const InnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  border: 1px solid blue;
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 30%;
`

const formSchema = yup.object().shape({
  email: yup
    .string()
    //.email("Must be a valid Email") // eloy: changed this from Email to Username because email is not used in backend.
    .required("Must include an username."), // eloy: changed this from Email to Username because email is not used in backend.
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters long") // eloy: changed this to 3 because default users in server have passwords that are 3 characters long
    .required("Password is required"),
});

const Login = (props) => {
  const [ inValidLogin, setInValidLogin ] = useState(false);

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    terms: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formData]);

  const onInputChange = (event) => {
    event.persist();

    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        });
      });

    setformData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("login form data",formData); // eloy: added this to check what data is being submitted
     
    axios
        .post("https://sleep-tracker-bw4.herokuapp.com/api/auth/login", { username: formData.email, password: formData.password }) // eloy: data submitted to backend
        .then(res => {
            setInValidLogin(false);
            window.localStorage.setItem('token', res.data.token);
            props.login(res);
            props.history.push('/Home');
        })
        .catch(err => {
          console.log("Error from get Login call in actions: ", err)
          setInValidLogin(true);
        });
    
    setformData({ email: "", password: "" });
  };

  return (
    <Div>
      <OuterDiv>
        <form onSubmit={onSubmit}>
          <InnerDiv>
            <input
              onChange={onInputChange}
              id="email"
              name="email"
              value={formData.email}
              placeholder="Username:" // eloy: changed this from Email to Username because email is not used in backend.
            ></input>

            <input
              onChange={onInputChange}
              id="password"
              name="password"
              value={formData.password}
              placeholder="Password:"
            ></input>

            <ButtonDiv>
              <button id="button" name="button">Submit</button>
              <button onClick={() => props.history.push('/Onboarding')}>Sign Up</button>
            </ButtonDiv>
          </InnerDiv>
        </form>
        {errors.password.length > 6 ? <p style={{color: "red"}}>{errors.password}</p> : null} {/* eloy: styled errors */}
        {errors.email.length > 0 ? <p style={{color: "red"}}>{errors.email}</p> : null} {/* eloy: styled errors */}
        {inValidLogin === true ? <p style={{color: "red"}}>invalid username or password</p> : null} {/* eloy: added this incase login is invalid */}
      </OuterDiv>
    </Div>
  );
};

export default connect(null, { login: login })(Login); // eloy: added this to hook up state and actions
