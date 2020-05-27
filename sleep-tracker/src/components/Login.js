import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { connect } from 'react-redux'; // eloy: added this to hook up state and actions
import { login } from '../actions'; // eloy: added this to hook up state and actions
import axios from 'axios'; // imported axios 

const formSchema = yup.object().shape({
  email: yup
    .string()
    //.email("Must be a valid Email") // eloy: removed this because sign up form does not ask for email.
    .required("Must include an username."), // eloy: changed this from Email to username becuase sign up form does not ask for email.
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onInputChange}
          id="email"
          name="email"
          value={formData.email}
          placeholder="Username:" // eloy: changed this from Email to Username because sign up form does not ask for email.
        ></input>
        {errors.email.length > 0 ? <p style={{color: "red"}}>{errors.email}</p> : null} {/* eloy: styled errors */}
        <input
          onChange={onInputChange}
          id="password"
          name="password"
          value={formData.password}
          placeholder="Password:"
        ></input>
        {errors.password.length > 6 ? <p style={{color: "red"}}>{errors.password}</p> : null} {/* eloy: styled errors */}
        <button id="button" name="button">
          Submit
        </button>
        {inValidLogin === true ? <p style={{color: "red"}}>invalid username or password</p> : null} {/* eloy: added this incase login is invalid */}
      </form>
    </div>
  );
};

export default connect(null, { login: login })(Login); // eloy: added this to hook up state and actions
