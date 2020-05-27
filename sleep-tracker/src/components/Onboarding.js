import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { connect } from 'react-redux'; // eloy: added this to hook up state and actions
import { register } from '../actions'; // eloy: added this to hook up state and actions

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
    <div>
      <form onSubmit={onSubmit}>
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
        <button type="text" id="button" name="button">
          Register
        </button>
      </form>
      <button onClick={() => props.history.push('/')}>Back To Login</button>
    </div>
  );
};

export default connect(null, { register: register })(Onboarding);
