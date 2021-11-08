import React from "react";
import { Divider, Form, Label, Input, TextArea } from "semantic-ui-react";
import styles from "../css/CreatePostPage.module.css";

const EditorArea = (props) => {
  const { onChange, onInputTag, tagInput, title, tags, body, currentTag } =
    props;

  console.log(body);

  return (
    <div>
      <Input
        size="big"
        fluid
        transparent
        placeholder="제목을 입력하세요"
        onChange={(e) => onChange("title", e.target.value)}
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
            onChange={(e) => onChange("currentTag", e.target.value)}
            onKeyUp={(e) => onInputTag(e)}
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
          onChange={(e) => onChange("body", e.target.value)}
          style={{ minHeight: 800, maxHeight: 800 }}
          value={body}
        />
      </Form>
    </div>
  );
};

export default EditorArea;
