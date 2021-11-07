import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Container,
  Divider,
  Grid,
  Header,
  Segment,
  Label
} from "semantic-ui-react";
import { ButtonArea, EditorArea } from "../components";
import { useHistory } from "react-router-dom";
import styles from "../css/EditPostPage.module.css";

const EditPostPage = props => {
  const { id } = props.match.params;
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
    if (id && id.length > 0) {
      if (postData.edit && postData.edit[id]) {
        const { title, tags, body } = postData.edit[id];

        if (title && title.length > 0) setTitle(title);
        if (tags && tags.length > 0) setTags(tags);
        if (body && body.length > 0) setBody(body);
      } else {
        axios
          .get("https://limitless-sierra-67996.herokuapp.com/v1/posts/" + id)
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              const { title, tags, body } = response.data;

              setTitle(title);
              setTags(tags);
              setBody(body);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
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
          .patch(
            "https://limitless-sierra-67996.herokuapp.com/v1" + "/posts/" + id,
            {
              id,
              title,
              body,
              tags
            }
          )
          .then(response => {
            console.log(response);
            history.push("/posts/" + id);
          })
          .catch(error => {
            console.error(error);
          });
        break;
      case "btnSaveTmp":
        console.log("btnSaveTmp");
        console.log("title, tags, body", title, tags, body);

        const newData = postData;
        if (!newData.edit) newData.edit = {};
        newData.edit[id] = { title, tags, body };

        window.localStorage.setItem("board", JSON.stringify(newData));
        break;
    }
  };

  return (
    <Container>
      <Grid columns={2} relaxed="very">
        <Grid.Column>
          <EditorArea
            onChange={handleChange}
            onInputTag={handleInputTag}
            tagInput={tagInput}
            title={title}
            tags={tags}
            body={body}
            currentTag={currentTag}
          />
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <Segment>
            <Header>{title}</Header>
            {tags &&
              tags.length > 0 &&
              tags.map((tag, index) => (
                <Label key={index + "_" + tag} as="a" tag color="teal">
                  {tag}
                </Label>
              ))}
            <Container className={styles.bodyArea}>{body}</Container>
          </Segment>
        </Grid.Column>
      </Grid>

      <Divider />
      <ButtonArea onClick={handleClick} edit />
    </Container>
  );
};

export default EditPostPage;
