import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Divider, Form, Label, Input, TextArea } from "semantic-ui-react";
import { ButtonArea } from "../components";
import { useHistory } from "react-router-dom";
import styles from "../css/CreatePostPage.module.css";

const CreatePostPage = () => {
  const history = useHistory();
  const [workingInPost] = useState(
    () => JSON.parse(window.localStorage.getItem("post")) || ""
  );
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const tagInput = useRef();

  useEffect(() => {
    if (workingInPost) {
      // 임시저장되어 있는 값 셋팅
      console.log(workingInPost);
      setTitle(workingInPost.title);
      setTags(workingInPost.tags);
      setContent(workingInPost.content);
    }
  }, []);

  const handleKeyPress = event => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      console.log("Enter key or comma pressed");
      const newTag = currentTag.replace(/,/g, "");

      console.log("currentTag", newTag);
      if (newTag && newTag.length > 0 && !tags.includes(newTag))
        setTags([...tags, newTag]);

      setCurrentTag("");
      tagInput.current.value = "";
    }
  };

  const handleClick = (event, data) => {
    const { id } = data;
    switch (id) {
      case "btnExit":
        console.log("btnExit");
        history.push("/");
        break;
      case "btnSave":
        console.log("btnSave");
        console.log("title, tags, content", title, tags, content);

        axios
          .post("https://limitless-sierra-67996.herokuapp.com/v1" + "/posts", {
            title,
            body: content,
            tags
          })
          .then(response => {
            console.log(response);
            history.push("/");
          })
          .catch(error => {
            console.e(error);
          });
        break;
      case "btnSaveTmp":
        console.log("btnSaveTmp");
        console.log("title, tags, content", title, tags, content);

        window.localStorage.setItem(
          "post",
          JSON.stringify({ title, tags, content })
        );
        break;
    }
  };
  return (
    <>
      <Input
        size="big"
        fluid
        transparent
        placeholder="제목을 입력하세요"
        onChange={e => setTitle(e.target.value)}
        value={title}
        className={styles.inputArea}
      />

      <div className={styles.tagArea}>
        <Label.Group tag className={styles.tagList}>
          {tags &&
            tags.length > 0 &&
            tags.map((tag, index) => (
              <Label key={index + "_" + tag} as="a" tag color="teal">
                {tag}
              </Label>
            ))}
          <Input
            size="small"
            fluid
            transparent
            placeholder="태그를 입력하세요"
            onChange={e => setCurrentTag(e.target.value)}
            onKeyUp={e => handleKeyPress(e)}
            className={styles.inputArea}
            value={currentTag}
            ref={tagInput}
          />
        </Label.Group>
      </div>

      <Divider clearing />

      <Form>
        <TextArea
          placeholder="Tell us more"
          onChange={e => setContent(e.target.value)}
          style={{ minHeight: 700 }}
          value={content}
        />
      </Form>

      <Divider />

      <ButtonArea onClick={handleClick} />
    </>
  );
};

export default CreatePostPage;
