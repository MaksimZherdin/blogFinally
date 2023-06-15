import "./index.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { Popconfirm, Spin } from "antd";
import { uid } from "react-uid";

import heart from "../../assets/img/Vector.svg";
import redHeart from "../../assets/img/Heart_corazón 1.svg";
import profilePic from "../../assets/img/Rectangle 1.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import getArticlePage from "../../store/asyncActions/articles/getArticlePage";
import favoriteArticle from "../../store/asyncActions/articles/favoriteArticle";
import unfavoriteArticle from "../../store/asyncActions/articles/unfavoriteArticle";
import deleteArticle from "../../store/asyncActions/articles/deleteArticle";
import path from "../../store/slices/pathSlicer";

function ArticleSlug() {
  const { article, isLoading } = useAppSelector(
    (state) => state.articlePageSlicer
  );
  const { isAuth, username } = useAppSelector((state) => state.userSlicer);
  const { favLoading } = useAppSelector((state) => state.articleSlicer);
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);
  const [favoritedCounter, setFavoritedCounter] = useState(0);
  const date = new Date(article.createdAt || "").toDateString();
  const month = date.split(" ").slice(1, 2);
  const day = date.split(" ").slice(2, 3);
  const year = date.split(" ").slice(3, 4);

  useEffect(() => {
    dispatch(getArticlePage(params.slug));
  }, []);

  useEffect(() => {
    setFavorited(article.favorited!);
    setFavoritedCounter(article.favoritesCount!);
  }, [article]);

  const isFav = () => {
    if (!isAuth) {
      return;
    }
    if (favorited) {
      setFavorited((prev) => !prev);
      setFavoritedCounter((favoritedCounter: number) => favoritedCounter - 1);
      dispatch(unfavoriteArticle(params.slug));
    } else {
      setFavorited((prev) => !prev);
      setFavoritedCounter((favoritedCounter: number) => favoritedCounter + 1);
      dispatch(favoriteArticle(params.slug));
    }
  };

  return (
    <div className="article article-slug">
      {isLoading ? (
        <Spin className="spin" size="large" />
      ) : (
        <>
          <header className="article__header">
            <div className="article__header-left">
              <div className="article__title-container">
                <h1 className="article__title">{article.title}</h1>
                <button
                  type="button"
                  disabled={favLoading}
                  style={{ cursor: "pointer", border: "none" }}
                  onClick={() => isFav()}
                >
                  <img src={favorited ? redHeart : heart} alt="" />
                </button>
                <span>{favoritedCounter}</span>
              </div>
              <ul className="tag-container">
                {article.tagList?.map((item) => (
                  <li key={uid(item)} className="tag tag-slug">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="article__header-right">
              <div className="data">
                <span className="username">{article.author?.username}</span>
                <span className="date-posted">{`${month}, ${day} ${year}`}</span>
              </div>
              <img
                className="profile-pic"
                src={article.author?.image ? article.author.image : profilePic}
                alt="profile pic"
                // eslint-disable-next-line no-return-assign
                onError={(e) => (e.currentTarget.src = profilePic)}
              />
            </div>
          </header>
          <div className="article__description article__description-slug">
            {article.description}
          </div>
          {article.author?.username === username ? (
            <div className="article__description-container">
              <Popconfirm
                title="Delete the article"
                description="Are you sure to delete this article?"
                onConfirm={async () => {
                  await dispatch(deleteArticle(params.slug));
                  navigate(path.articles);
                  window.location.reload();
                }}
                okText="Yes"
                cancelText="No"
                placement="right"
              >
                <button
                  type="button"
                  className="article__btn-delete create-article"
                >
                  Delete
                </button>
              </Popconfirm>
              <button
                type="button"
                onClick={() => navigate(`/articles/${params.slug}/edit`)}
                className="article__btn-create create-article"
              >
                Edit
              </button>
            </div>
          ) : null}
          <div className="article__body">
            <Markdown>{article.body ? article.body : ""}</Markdown>
          </div>
        </>
      )}
    </div>
  );
}

export default ArticleSlug;
