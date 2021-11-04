import React, { useEffect, useState } from "react";
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
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

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
      console.log("Enter key or comma pressed");
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
            body: content
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
        defaultValue={title}
        className={styles.inputArea}
      />
      <Input
        size="small"
        fluid
        transparent
        placeholder="태그를 입력하세요"
        //   onChange={e => setTags(e.target.value)}
        onKeyPress={e => handleKeyPress(e)}
        defaultValue={tags}
        className={styles.inputArea}
      />

      <Divider clearing />

      <Form>
        <TextArea
          placeholder="Tell us more"
          onChange={e => setContent(e.target.value)}
          style={{ minHeight: 700 }}
          defaultValue={content}
        />
      </Form>

      <Divider />

      <ButtonArea onClick={handleClick} />
    </>
  );
};

export default CreatePostPage;
