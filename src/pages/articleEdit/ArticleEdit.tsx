import { useFieldArray, useForm } from "react-hook-form";
import "./index.css";
import { Form, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import getArticlePage from "../../store/asyncActions/articles/getArticlePage";
import updateArticle from "../../store/asyncActions/articles/updateArticle";
import path from "../../store/slices/pathSlicer";
import createArticle from "../../store/asyncActions/articles/createArticle";
import { clearArticlePage } from "../../store/slices/articlePageSlicer";

function ArticleEdit() {
  const { article: articlePage, isLoading } = useAppSelector(
    (state) => state.articlePageSlicer
  );
  const [tagValue, setTagValue] = useState("");
  const [body, setBody] = useState(articlePage.body);
  const [title, setTitle] = useState(articlePage.title);
  const [description, setDescription] = useState(articlePage.description);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  type StrNum = string | number | undefined;
  type FormValues = {
    tags: {
      text: StrNum;
    }[];
    title: string;
    description: string;
    body: string;
  };
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      tags: articlePage.tagList
        ? articlePage?.tagList?.map((tag) => ({ text: tag }))
        : [],
      title: articlePage.title ? articlePage?.title : "",
      description: articlePage.description ? articlePage?.description : "",
      body: articlePage.body ? articlePage?.body : "",
    },
  });

  useEffect(() => {
    dispatch(getArticlePage(params.slug));
    if (params.slug === undefined) {
      dispatch(clearArticlePage());
    }
  }, []);

  useEffect(() => {
    setTitle(articlePage.title);
    setBody(articlePage.body);
    setDescription(articlePage.description);
    reset({
      tags: articlePage.tagList?.map((tag: any) => ({ text: tag })),
      title: articlePage?.title,
      description: articlePage?.description,
      body: articlePage?.body,
    });
  }, [articlePage, reset]);

  const { fields, append, remove } = useFieldArray<any>({
    name: "tags",
    control,
  });
  useEffect(() => {
    if (params.slug === undefined) {
      dispatch(clearArticlePage());
      setTitle("");
      setBody("");
      setDescription("");
      setTagValue("");
    } else {
      dispatch(getArticlePage(params.slug));
      setTitle(articlePage.title);
      setBody(articlePage.body);
      setDescription(articlePage.description);
    }
  }, [params.slug]);
  const submitForm = (data: any) => {
    const article = {
      title: data.title,
      body: data.body,
      tagList: data.tags
        .filter((item: any) => item.text !== "")
        .map((item: any) => item.text),
      description: data.description,
    };
    navigate(params.slug ? `/articles/${params.slug}` : path.articles);
    if (articlePage.author) {
      dispatch(
        updateArticle({
          article: { article },
          slug: params.slug,
        })
      );
    } else {
      dispatch(createArticle({ article }));
    }
  };

  return (
    <div className="article article-create">
      <span className="article__create-title">
        {params.slug ? <>Edit Article</> : <>Create Article</>}
      </span>
      {isLoading ? (
        "Loading"
      ) : (
        <Form
          onSubmitCapture={handleSubmit(submitForm)}
          name="Article Create"
          layout="vertical"
        >
          <Form.Item label="Title">
            <input
              value={title || ""}
              placeholder="Title"
              className="input input-article"
              {...register("title", {
                onChange: (e) => setTitle(e.target.value),
                required: {
                  value: true,
                  message: "This field is required",
                },
                maxLength: {
                  value: 40,
                  message: "Limit of 40 characters",
                },
              })}
            />
            <span className="error-message">
              {errors.title?.message && <>{errors.title.message}</>}
            </span>
          </Form.Item>
          <Form.Item label="Short description">
            <input
              value={description || ""}
              placeholder="Title"
              className="input input-article"
              {...register("description", {
                onChange: (e) => setDescription(e.target.value),
                required: {
                  value: true,
                  message: "This field is required",
                },
                maxLength: {
                  value: 100,
                  message: "Limit of 100 characters",
                },
              })}
            />
            <span className="error-message">
              {errors.description?.message && <>{errors.description.message}</>}
            </span>
          </Form.Item>
          <Form.Item label="Text" name="body">
            <div>
              <textarea
                value={body || ""}
                rows={6}
                placeholder="Title"
                className="input input-article textarea"
                {...register("body", {
                  onChange: (e) => setBody(e.target.value),
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
              <span className="error-message">
                {errors.body?.message && <>{errors.body.message}</>}
              </span>
            </div>
          </Form.Item>
          <Form.Item label="Tags" name="Tags">
            <div>
              <div className="input-container">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {fields.map((field, index) => (
                    <section className="first-input" key={field.id}>
                      <input
                        className="input input-field"
                        placeholder="Tag"
                        {...register(`tags.${index}.text`, {
                          value: tagValue,
                          onChange: (e) => setTagValue(e.target.value),
                          pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message:
                              "You can use only letters and digits without spaces and other symbols",
                          },
                          maxLength: {
                            value: 20,
                            message: "Limit of 20 characters",
                          },
                        })}
                      />
                      <Button
                        onClick={() => remove(index)}
                        danger
                        type="default"
                        className="btn-article"
                      >
                        Delete
                      </Button>
                    </section>
                  ))}
                </div>
                <Button
                  onClick={() => {
                    append(tagValue);
                    setTagValue("");
                  }}
                  type="default"
                  className="btn-article btn-default"
                >
                  Add tag
                </Button>
              </div>
              <span className="error-message">
                {errors.tags?.[fields.length - 1] && (
                  <>{errors.tags?.[fields.length - 1]?.text?.message}</>
                )}
              </span>
            </div>
          </Form.Item>
          <button className="btn-send" type="submit">
            Send
          </button>
        </Form>
      )}
    </div>
  );
}

export default ArticleEdit;
