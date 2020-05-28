import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { connect } from 'react-redux'; // eloy: added this to hook up state and actions
import { register } from '../actions'; // eloy: added this to hook up state and actions
import styled from 'styled-components'; // eloy: added this for styles


const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #9e9e9e;
`

const OuterDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 35%;
  width: 20%;
  border-radius: 50px;
  background: #9e9e9e;
  box-shadow:  27px 27px 55px #868686, 
               -27px -27px 55px #b6b6b6;
`

const InnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 30%;
`

const Button = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #424242;
  padding: 5%;
  border-radius: 5px;
  background: linear-gradient(145deg, #a9a9a9, #8e8e8e);
  box-shadow:  4px 4px 8px #868686, 
               -4px -4px 8px #b6b6b6;
  &:hover {
      background: white;
  }
`

const H1 = styled.h1`
  color: #424242;
  margin-bottom: 5%;
`


const formSchema = yup.object().shape({
  username: yup.string().required("Must include username"),
  firstname: yup.string().required("Must include first name"),
  lastname: yup.string().required("Must include lastname"),
  email: yup.string().required("Must contain a valid Email Adress"),
  password: yup
    .string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
});

const Onboarding = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
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
      .validate(event.target.name)
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

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // eloy: connected form to back end and formated data
    if ((formData.username === "") || (formData.firstname === "") || (formData.lastname === "") || (formData.password === "")) {
      alert("PLEASE FILL IN ALL THE BOXES!")
    } else {
      props.register(
        { username: formData.username, password: formData.password, name: `${formData.firstname.toLowerCase()} ${formData.lastname.toLowerCase()}`, age: 20 }
      )
      props.history.push('/')
      setFormData({
        username: "",
        firstname: "",
        lastname: "",
        //email: "", // eloy: removed this because email is not used in backend.
        password: "",
      })
    }
  };

  return (
    <Div>
      <H1>Sleep Tracker Sign Up Page</H1>
      <OuterDiv>
        <form >
          <InnerDiv>
            <input
              onChange={onInputChange}
              type="text"
              id="name"
              name="username"
              value={formData.username}
              placeholder="Username:"
            ></input>
            {errors.username.length > 0 ? <p>{errors.username}</p> : null}
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={onInputChange}
              value={formData.firstname}
              placeholder="First Name:"
            ></input>
            <input
              onChange={onInputChange}
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              placeholder="LastName:"
            ></input>
            <input
              onChange={onInputChange}
              type="text"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Password"
            ></input>
            <ButtonDiv>
              <Button type="text" id="button" name="button" onClick={onSubmit}>Register</Button>
              <Button onClick={() => props.history.push('/')}>  Login</Button>
            </ButtonDiv>
          </InnerDiv>
        </form>
        
      </OuterDiv>
    </Div>
  );
};

export default connect(null, { register: register })(Onboarding);
