import { Link, useNavigate } from "react-router-dom";

import "./index.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logOut } from "../../store/slices/userSlicer";
import profilePic from "../../assets/img/Rectangle 1.svg";
import path from "../../store/slices/pathSlicer";

function Header() {
  const { isAuth, image, username } = useAppSelector(
    (state) => state.userSlicer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logOutUser = () => {
    dispatch(logOut());
    navigate(path.articles);
  };

  return (
    <div className="header">
      <span className="header__left">
        <Link to="/">Realworld Blog</Link>
      </span>
      <ul className="header__right">
        {isAuth ? (
          <>
            <li className="create-article">
              <Link to={path.newArticle}>Create article</Link>
            </li>
            <li>
              <Link className="date-container" to={path.profile}>
                <span className="username">{username}</span>
                <img
                  className="profile-pic"
                  src={image}
                  alt="profilepic"
                  onError={(e) => {
                    e.currentTarget.src = profilePic;
                  }}
                />
              </Link>
            </li>
            <li>
              <button
                className="log-out"
                type="button"
                onClick={() => logOutUser()}
              >
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={path.signIn}>Sign In</Link>
            </li>
            <li className="sign-up">
              <Link to={path.signUp}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
