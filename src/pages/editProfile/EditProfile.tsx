import { Form, Button } from "antd";
import "./index.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import updateUser from "../../store/asyncActions/auth/putUser";

function EditProfile() {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  const { username, email, image, error } = useAppSelector(
    (state) => state.userSlicer
  );
  const dispatch = useAppDispatch();
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassowrd, setNewPassword] = useState("");
  const [imageUrl, setNewImageUrl] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const {
    formState: { errors, isValid },
    register,
    reset,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      usernameProfile: username,
      emailAddressProfile: email,
      passwordProfile: "",
      imageProfile: "",
    },
  });

  useEffect(() => {
    reset({
      usernameProfile: username,
      emailAddressProfile: email,
    });
  }, [username]);

  const user = {
    email: newEmail,
    username: newUsername,
    password: newPassowrd || null,
    image: imageUrl || image,
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

  const submitForm = (data: any) => {
    if (data.passwordProfile === "") {
      dispatch(
        updateUser({
          email: data.emailAddressProfile,
          username: data.usernameProfile,
          image: data.imageUrl || image,
        })
      );
    } else {
      dispatch(updateUser(user));
    }
  };

  useEffect(() => {
    if (error !== null) {
      checkError(error);
    }
  }, [error]);

  return (
    <div className="edit-page">
      <span className="edit-title">Edit Profile</span>
      <Form
        name="editProfile"
        layout="vertical"
        onSubmitCapture={handleSubmit(submitForm)}
      >
        <Form.Item
          style={{ width: "320px " }}
          wrapperCol={{ span: 32 }}
          label="Username"
        >
          <input
            className="input"
            placeholder="Username"
            {...register("usernameProfile", {
              onChange: (e) => setNewUsername(e.target.value),
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
          <div className="error-message">
            {errors?.usernameProfile && <>{errors?.usernameProfile?.message}</>}
            {userNameError && <p>Username is already taken</p>}
          </div>
        </Form.Item>
        <Form.Item
          style={{ width: "320px " }}
          wrapperCol={{ span: 32 }}
          label="Email address"
        >
          <input
            className="input"
            placeholder="Email"
            {...register("emailAddressProfile", {
              onChange: (e) => setNewEmail(e.target.value),
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Use correct Email",
              },
              required: "This field is required",
            })}
          />
          <div className="error-message">
            {errors?.emailAddressProfile && (
              <>{errors?.emailAddressProfile?.message}</>
            )}
            {emailError && <p>Email is already taken</p>}
          </div>
        </Form.Item>
        <Form.Item label="New password">
          <input
            className="input"
            placeholder="New Password"
            type="password"
            {...register("passwordProfile", {
              onChange: (e) => setNewPassword(e.target.value),
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message:
                  "You can use only english letters and digits without spaces and other symbols",
              },
              minLength: {
                value: 6,
                message: "At least 6 characters",
              },
              maxLength: {
                value: 20,
                message: "Limit of 40 characters",
              },
            })}
          />
          <div className="error-message">
            {errors?.passwordProfile && <>{errors?.passwordProfile?.message}</>}
          </div>
        </Form.Item>

        <Form.Item label="Avatar image (url)">
          <input
            className="input"
            placeholder="Image Url"
            {...register("imageProfile", {
              onChange: (e) => setNewImageUrl(e.target.value),
              pattern: {
                value: urlPattern,
                message: "Url should be correct",
              },
            })}
          />
          <div className="error-message">
            {errors?.imageProfile && <>{errors?.imageProfile?.message}</>}
          </div>
        </Form.Item>
        <button
          disabled={!isValid}
          className="btn-send submit-button"
          type="submit"
        >
          Save
        </button>
      </Form>
    </div>
  );
}

export default EditProfile;
