import { useEffect, useState } from "react";
import "./index.css";
import { Pagination, Spin } from "antd";
import { uid } from "react-uid";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import getArticles from "../../store/asyncActions/articles/getArticles";
import { setPage } from "../../store/slices/paginationSlicer";
import ArticleItem from "../../components/articleItem/ArticleItem";

function Homepage() {
  const { articles, isLoading } = useAppSelector(
    (state) => state.articleSlicer
  );

  const dispatch = useAppDispatch();
  const { current } = useAppSelector((state) => state.paginationSlicer);
  const [articlesCount, setArticlesCount] = useState();
  const changePage = (num: number) => {
    dispatch(setPage(num));
    dispatch(getArticles(num - 1));
  };

  const pagesCount = async () => {
    fetch("https://blog.kata.academy/api/articles")
      .then((res) => res.json())
      .then((res) => setArticlesCount(res.articlesCount));
  };

  useEffect(() => {
    dispatch(getArticles(current - 1));
    pagesCount();
  }, []);

  return (
    <div className="main">
      {isLoading ? (
        <Spin size="large" className="spin" />
      ) : (
        articles.map((item) => <ArticleItem key={uid(item)} item={item} />)
      )}
      <div className="pagination-container">
        <Pagination
          disabled={isLoading}
          defaultCurrent={current}
          onChange={(e) => changePage(e)}
          className="pagination"
          total={articlesCount}
        />
      </div>
    </div>
  );
}

export default Homepage;
