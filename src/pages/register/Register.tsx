import { Form, Button, Checkbox } from "antd";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import registerUser from "../../store/asyncActions/auth/regUser";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import path from "../../store/slices/pathSlicer";

function Register() {
  const dispatch = useAppDispatch();
  const {
    formState: { errors, isValid },
    register,
  } = useForm({
    mode: "onBlur",
  });
  const { error } = useAppSelector((state) => state.userSlicer);
  const [checkAgree, setCheckAgree] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassowrd, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const user = {
    username,
    password,
    email,
  };

  const checkError = (error: any) => {
    const { username, email } = error.errors;
    if (username !== undefined) {
      setUserNameError(true);
    }
    if (email !== undefined) {
      setEmailError(true);
    }
  };

  useEffect(() => {
    if (error !== null) {
      checkError(error);
    }
  }, [error]);

  const repeat = () => {
    if (password.length <= 3) {
      setRepeatPassword(false);
      return;
    }
    if (newPassowrd === password) {
      setRepeatPassword(true);
    } else {
      setRepeatPassword(false);
    }
  };

  useEffect(() => {
    repeat();
  }, [password, newPassowrd]);

  return (
    <div className="register-page">
      <span className="register-title">Create new account</span>
      <Form name="usernameRegister" layout="vertical">
        <Form.Item
          className="form-item"
          wrapperCol={{ span: 32 }}
          label="Username"
        >
          <input
            className="input"
            placeholder="Username"
            {...register("Username", {
              value: username,
              onChange: (e) => setUsername(e.target.value),
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message:
                  "You can only use lowercase English letters and numbers",
              },
              minLength: {
                value: 3,
                message: "At least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Limit of 20 characters",
              },
              required: "This field is required",
            })}
          />
        </Form.Item>
        <div className="error-message">
          {errors?.Username && <>{errors?.Username?.message}</>}
          {userNameError && <p>Username is already taken</p>}
        </div>
        <Form.Item
          className="form-item"
          wrapperCol={{ span: 32 }}
          label="Email address"
        >
          <input
            className="input"
            placeholder="Email address"
            {...register("emailAddress", {
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
          {errors?.emailAddress && <>{errors?.emailAddress?.message}</>}
          {emailError && <p>Email is already taken</p>}
        </div>
        <Form.Item className="form-item" label="Password">
          <input
            className="input"
            placeholder="Password"
            {...register("passwordReg", {
              value: password,
              onChange: (e) => setPassword(e.target.value),
              minLength: {
                value: 6,
                message: "At least 6 characters",
              },
              maxLength: {
                value: 20,
                message: "Limit of 20 characters",
              },
              required: "This field is required",
            })}
            type="password"
          />
        </Form.Item>
        <div className="error-message">
          {errors?.passwordReg && <>{errors?.passwordReg?.message}</>}
        </div>
        <Form.Item className="form-item" label="Repeat Password">
          <input
            className="input"
            placeholder="Password"
            {...register("passwordRepeat", {
              value: newPassowrd,
              onChange: (e) => setNewPassword(e.target.value),
              minLength: {
                value: 6,
                message: "At least 6 characters",
              },
              maxLength: {
                value: 20,
                message: "Limit of 20 characters",
              },
            })}
            type="password"
          />
        </Form.Item>
        <div className="error-message">
          {!repeatPassword && <>Пароли не совпадают</>}
        </div>
        <Form.Item className="form-item">
          <div className="register__checkbox">
            <Checkbox
              type="checkbox"
              {...register("checkbox", {
                onChange: () => setCheckAgree((prev: boolean) => !prev),
              })}
            />
            I agree to the processing of my personal information
          </div>
          <div className="error-message">
            {errors?.checkbox && <>{errors?.checkbox?.message}</>}
          </div>
        </Form.Item>
        <Button
          disabled={!(repeatPassword && isValid && checkAgree)}
          style={{ maxWidth: 320 }}
          className="submit-button"
          type="primary"
          onClick={async () => {
            await dispatch(registerUser({ user }));
            if (localStorage.getItem("token")) {
              navigate(path.articles);
              window.location.reload();
            }
          }}
        >
          Create
        </Button>
        <p className="login-link">
          Already have an account?<Link to={path.signIn}>Sign In</Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;
