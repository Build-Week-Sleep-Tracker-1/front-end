import React, { useState, useEffect } from "react";
import * as yup from "yup";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid Email")
    .required("Must include an email adress."),
  password: yup
    .string()
    .min(6, "Password must be atleast 6 characters long")
    .required("Password is required"),
});

const Login = (props) => {
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
          placeholder="Email:"
        ></input>
        {errors.email.length > 0 ? <p>{errors.email}</p> : null}
        <input
          onChange={onInputChange}
          id="password"
          name="password"
          value={formData.password}
          placeholder="Password:"
        ></input>
        {errors.password.length > 6 ? <p>{errors.password}</p> : null}
        <button id="button" name="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
