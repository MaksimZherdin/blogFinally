import { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import uniqid from "uniqid";

import profilePic from "../../assets/img/Rectangle 1.svg";
import redHeart from "../../assets/img/Heart_corazón 1.svg";
import heart from "../../assets/img/Vector.svg";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import favoriteArticle from "../../store/asyncActions/articles/favoriteArticle";
import unfavoriteArticle from "../../store/asyncActions/articles/unfavoriteArticle";

interface IProps {
  item: {
    favoritesCount: number;
    favorited: boolean;
    slug: string;
    createdAt: string;
    title: string;
    description: string;
    author: {
      username: string;
      image: string;
    };
    tagList: [];
  };
}

function ArticleItem({ item }: IProps) {
  const { isAuth } = useAppSelector((state) => state.userSlicer);
  const { favLoading } = useAppSelector((state) => state.articleSlicer);
  const [favorited, setFavorited] = useState(item.favorited);
  const [favoritedCounter, setFavoritedCounter] = useState(item.favoritesCount);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFav = () => {
    if (!isAuth) {
      return;
    }
    if (favorited) {
      setFavorited((prev: boolean) => !prev);
      setFavoritedCounter(favoritedCounter - 1);
      dispatch(unfavoriteArticle(item.slug));
    } else {
      setFavorited((prev: boolean) => !prev);
      setFavoritedCounter(favoritedCounter + 1);
      dispatch(favoriteArticle(item.slug));
    }
  };

  const date = new Date(item.createdAt || "").toDateString();
  const month = date.split(" ").slice(1, 2);
  const day = date.split(" ").slice(2, 3);
  const year = date.split(" ").slice(3, 4);

  return (
    <div className="article">
      <header className="article__header">
        <div className="article__header-left">
          <div className="article__title-container">
            <button
              className="article__title article__title-item"
              type="button"
              onClick={() => navigate(`/articles/${item.slug}`)}
            >
              {item.title}
            </button>
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
            {item.tagList.map((tag: string) => (
              <li key={uniqid()} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="article__header-right">
          <div className="data">
            <span className="username">{item.author?.username}</span>
            <span className="date-posted">{`${month}, ${day} ${year}`}</span>
          </div>
          <img
            className="profile-pic"
            src={item.author.image ? item.author.image : profilePic}
            // eslint-disable-next-line no-return-assign
            onError={(e) => (e.currentTarget.src = profilePic)}
            alt="profile pic"
          />
        </div>
      </header>
      <div className="article__description">{item.description}</div>
    </div>
  );
}

export default ArticleItem;
