import React from "react";
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
  return (
    <Form>
      <Form.Field>
        <Input size="big" fluid transparent placeholder="제목을 입력하세요" />
      </Form.Field>
      <Form.Field>
        <Input size="small" fluid transparent placeholder="태그를 입력하세요" />
      </Form.Field>

      <Divider clearing />
      {/* <MDEditor value={value} onChange={setValue} /> */}
      <Form.Field>
        <TextArea placeholder="Tell us more" />
      </Form.Field>

      <Divider />

      <Form.Field>
        <Grid>
          <Grid.Column floated="left" width={5}>
            <Icon name="arrow left" />
            나가기
          </Grid.Column>
          <Grid.Column textAlign="right" floated="right" width={5}>
            <Button secondary>임시저장</Button>
            <Button primary>출간하기</Button>
          </Grid.Column>
        </Grid>
      </Form.Field>
    </Form>
  );
};

export default CreatePostPage;
