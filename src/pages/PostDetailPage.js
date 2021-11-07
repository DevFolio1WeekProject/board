import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Container, Modal, Icon, Button } from "semantic-ui-react";
import Header from "../components/Header";
import TagList from "../components/TagList";
import CommentList from "../components/CommentList";

const PostDetailPage = props => {
  const history = useHistory();
  let location = useLocation();
  let [post, setPost] = useState(null);
  let [comments, setComments] = useState([]);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  console.log(location.pathname.split("/")[2]);
  useEffect(() => {
    axios
      .get(
        "https://limitless-sierra-67996.herokuapp.com/v1/posts/" +
          location.pathname.split("/")[2]
      )
      .then(res => {
        console.log(res);
        setPost(res.data);
      });

    axios
      .get(
        "https://limitless-sierra-67996.herokuapp.com/v1/comments/postId=" +
          location.pathname.split("/")[2]
      )
      .then(res => {
        console.log(res);
        setComments(res.data);
      });
  }, []);

  if (!post) {
    return null;
  }

  console.log("post.body", post.body);
  let title = post.title
    .split("\\n")
    .join("<br />")
    .split("&lt;")
    .join("<");
  let content = post.body
    .split("\\n")
    .join("<br />")
    .split("&lt;")
    .join("<");

  const removePost = id => {
    if (id && id.length > 0) {
      axios
        .delete("https://limitless-sierra-67996.herokuapp.com/v1/posts/" + id)
        .then(response => {
          if (response.status == 204) {
            console.log("remove success, id: " + id);
            history.push("/");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <Header
        id={props.match.params.id}
        onRemove={() => setDeletePopupOpen(true)}
      />
      <Container>
        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
        <hr />
        <div>
          <TagList tags={post.tags} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        <CommentList comments={comments} />
      </Container>

      <Modal
        onClose={() => setDeletePopupOpen(false)}
        onOpen={() => setDeletePopupOpen(true)}
        open={deletePopupOpen}
        size="tiny"
      >
        <Modal.Header>포스트 삭제</Modal.Header>
        <Modal.Content image>
          <div className="image">
            <Icon name="trash alternate" />
          </div>
          <Modal.Description>
            <p>정말로 삭제하시겠습니까?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={() => setDeletePopupOpen(false)}>
            <Icon name="undo" /> 취소
          </Button>
          <Button primary onClick={() => removePost(props.match.params.id)}>
            <Icon name="check" /> 확인
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default PostDetailPage;
