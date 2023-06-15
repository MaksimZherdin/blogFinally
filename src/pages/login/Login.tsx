import { Form, Button } from "antd";
import "./index.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import logUser from "../../store/asyncActions/auth/logUser";
import getUser from "../../store/asyncActions/auth/getUser";
import path from "../../store/slices/pathSlicer";

function Login() {
  const {
    formState: { errors, isValid },
    register,
  } = useForm({
    mode: "onBlur",
  });
  const { error } = useAppSelector((state) => state.userSlicer);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const user = {
    email: email.toLowerCase(),
    password,
  };

  const checkError = () => {
    setPasswordError(true);
    setEmailError(true);
  };

  useEffect(() => {
    if (error !== null) {
      checkError();
    }
  }, [error]);

  const loginUser = () => {
    dispatch(logUser({ user }));
    dispatch(getUser());
  };

  return (
    <div className="login-page">
      <span className="login-title">Sign In</span>
      <Form name="usernameLogin" layout="vertical">
        <Form.Item
          className="form-item"
          wrapperCol={{ span: 32 }}
          label="Email address"
        >
          <input
            className="input"
            placeholder="Email address"
            {...register("emailAddressLogin", {
              onChange: (e) => setEmail(e.target.value),
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Use correct Email",
              },
              required: "This field is required",
            })}
          />
        </Form.Item>
        <div className="error-message">
          {errors?.emailAddressLogin && (
            <>{errors?.emailAddressLogin?.message}</>
          )}
          {emailError && <p>Is invalid</p>}
        </div>
        <Form.Item
          className="form-item"
          wrapperCol={{ span: 32 }}
          label="Password"
        >
          <input
            className="input"
            placeholder="Password"
            type="password"
            {...register("passwordLogin", {
              onChange: (e) => setPassword(e.target.value),
              required: "This field is required",
            })}
          />
        </Form.Item>
        <div className="error-message">
          {errors?.passwordLogin && <>{errors?.passwordLogin?.message}</>}
          {passwordError && <p>Is invalid</p>}
        </div>
        <Button
          onClick={() => loginUser()}
          disabled={!isValid}
          className="submit-button"
          type="primary"
        >
          Login
        </Button>
        <p className="login-link">
          Dont have an account?<Link to={path.signUp}>Sign Up</Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
