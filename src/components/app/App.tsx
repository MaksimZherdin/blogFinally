import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";

import Homepage from "../../pages/homepage/Homepage";
import Login from "../../pages/login/Login";
import Layout from "../Layout/Layout";
import Register from "../../pages/register/Register";
import EditProfile from "../../pages/editProfile/EditProfile";
import ArticleSlug from "../../pages/articleSlug/ArticleSlug";
import getArticles from "../../store/asyncActions/articles/getArticles";
import { useAppDispatch } from "../../hooks/redux";
import getUser from "../../store/asyncActions/auth/getUser";
import ArticleEdit from "../../pages/articleEdit/ArticleEdit";
import path from "../../store/slices/pathSlicer";

function App() {
  const dispatch = useAppDispatch();
  const tokenLocal = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getArticles(0));
  }, []);

  useEffect(() => {
    if (tokenLocal) {
      dispatch(getUser());
    }
  }, []);
  window.addEventListener("storage", () => {
    window.location.reload();
  });
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path={path.articles} element={<Homepage />} />
          <Route
            path={path.signIn}
            element={tokenLocal ? <Navigate to={path.articles} /> : <Login />}
          />
          <Route
            path={path.signUp}
            element={
              tokenLocal ? <Navigate to={path.articles} /> : <Register />
            }
          />
          <Route
            path={path.profile}
            element={
              tokenLocal ? <EditProfile /> : <Navigate to={path.signIn} />
            }
          />
          <Route path={path.slugArticle} element={<ArticleSlug />} />
          <Route
            path={path.newArticle}
            element={
              tokenLocal ? <ArticleEdit /> : <Navigate to={path.articles} />
            }
          />
          <Route
            path={path.editArticle}
            element={
              tokenLocal ? <ArticleEdit /> : <Navigate to={path.articles} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
