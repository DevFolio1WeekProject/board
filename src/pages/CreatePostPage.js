import React, { useEffect, useState } from "react";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import {
  Button,
  Divider,
  Form,
  Grid,
  Input,
  Icon,
  TextArea
} from "semantic-ui-react";

const CreatePostPage = () => {
  //   const [value, setValue] = React.useState("**Hello world!!!**");
  const [workingInPost] = useState(
    () => JSON.parse(window.localStorage.getItem("post")) || ""
  );
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (workingInPost) {
      console.log(workingInPost);
      setTitle(workingInPost.title);
      setTags(workingInPost.tags);
      setContent(workingInPost.content);
    }
  }, []);

  const handleClick = (event, data) => {
    const { id } = data;
    switch (id) {
      case "btnSave":
        console.log("btnSave");
        console.log("title", title);
        console.log("tags", tags);
        console.log("content", content);

        axios
          .post("https://limitless-sierra-67996.herokuapp.com/v1" + "/posts", {
            title,
            body: content
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.e(error);
          });
        break;
      case "btnSaveTmp":
        console.log("btnSaveTmp");
        console.log("title", title);
        console.log("tags", tags);
        console.log("content", content);

        window.localStorage.setItem(
          "post",
          JSON.stringify({ title, tags, content })
        );
        break;
    }
  };
  return (
    <Form>
      <Form.Field>
        <Input
          size="big"
          fluid
          transparent
          placeholder="제목을 입력하세요"
          onChange={e => setTitle(e.target.value)}
          defaultValue={title}
        />
      </Form.Field>
      <Form.Field>
        <Input
          size="small"
          fluid
          transparent
          placeholder="태그를 입력하세요"
          onChange={e => setTags(e.target.value)}
          defaultValue={tags}
        />
      </Form.Field>

      <Divider clearing />
      {/* <MDEditor value={value} onChange={setValue} /> */}
      <Form.Field>
        <TextArea
          placeholder="Tell us more"
          onChange={e => setContent(e.target.value)}
          defaultValue={content}
        />
      </Form.Field>

      <Divider />

      <Form.Field>
        <Grid>
          <Grid.Column floated="left" width={5}>
            <Icon name="arrow left" />
            나가기
          </Grid.Column>
          <Grid.Column textAlign="right" floated="right" width={5}>
            <Button
              id="btnSaveTmp"
              secondary
              onClick={(event, data) => handleClick(event, data)}
            >
              임시저장
            </Button>
            <Button
              id="btnSave"
              primary
              onClick={(event, data) => handleClick(event, data)}
            >
              출간하기
            </Button>
          </Grid.Column>
        </Grid>
      </Form.Field>
    </Form>
  );
};

export default CreatePostPage;
