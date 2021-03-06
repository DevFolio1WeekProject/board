import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Container, Divider } from "semantic-ui-react";
import { ButtonArea, EditorArea } from "../components";
import { useHistory } from "react-router-dom";

const CreatePostPage = () => {
  const history = useHistory();
  const [postData] = useState(
    () => JSON.parse(window.localStorage.getItem("board")) || {}
  );
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const tagInput = useRef();

  useEffect(() => {
    if (postData.create) {
      // 임시저장되어 있는 값 셋팅
      console.log(postData);
      setTitle(postData.create.title);
      setTags(postData.create.tags);
      setBody(postData.create.body);
    }
  }, []);

  const handleInputTag = event => {
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

  const handleChange = (name, value) => {
    console.log("handleChange", name, value);
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "currentTag":
        setCurrentTag(value);
        break;
      case "body":
        setBody(value);
        break;
    }
  };

  const handleClick = (event, data) => {
    const { name } = data;
    switch (name) {
      case "btnExit":
        console.log("btnExit");
        history.push("/");
        break;
      case "btnSave":
        console.log("btnSave");
        console.log("title, tags, body", title, tags, body);

        axios
          .post("https://limitless-sierra-67996.herokuapp.com/v1" + "/posts", {
            title,
            body,
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
        console.log("title, tags, body", title, tags, body);

        const newData = postData;
        newData.create = { title, tags, body };

        window.localStorage.setItem("board", JSON.stringify(newData));
        break;
    }
  };
  return (
    <Container>
      <EditorArea
        onChange={handleChange}
        onInputTag={handleInputTag}
        tagInput={tagInput}
        title={title}
        tags={tags}
        body={body}
        currentTag={currentTag}
      />
      <Divider />
      <ButtonArea onClick={handleClick} />
    </Container>
  );
};

export default CreatePostPage;
