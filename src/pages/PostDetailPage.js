import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Container, Modal, Icon, Button } from "semantic-ui-react";
import Header from "../components/Header";
import TagList from "../components/TagList";
import CommentList from "../components/CommentList";
import styles from "../css/PostDetailPage.module.css";
import { formatDate } from "../utils.js";

const PostDetailPage = (props) => {
  const history = useHistory();
  let location = useLocation();
  let [post, setPost] = useState(null);
  let [comments, setComments] = useState([]);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  
  let [commentPageNumber, setCommentPageNumber] = useState(1);
  let [totalCommentCount, setTotalCommentCount] = useState(0);
  let [commentHasMore, setCommentHasMore] = useState(true);

  let postId = location.pathname.split("/")[2];

  let getCommentList = () => {
    axios
      .get(
        `https://limitless-sierra-67996.herokuapp.com/v1/comments?postId=${postId}&limit=${10}&page=${commentPageNumber}`
      )
      .then((res) => {
        console.log('init comment Result', res.data);
        setComments([...comments, ...res.data.results]);
        setTotalCommentCount(res.data.totalResults);
        console.log(res.data.totalPages,  commentPageNumber+1)
        if(res.data.totalPages === commentPageNumber){
          console.log('11111');
          setCommentHasMore(false);
          return;
        }else{
          console.log('22222');
          setCommentPageNumber(commentPageNumber + 1);
        }
    });
  }

  useEffect(() => {
    axios
      .get("https://limitless-sierra-67996.herokuapp.com/v1/posts/" + postId)
      .then((res) => {
        setPost(res.data);
      });
      getCommentList();
  }, []);

  if (!post) {
    return null;
  }

  let title = post.title.split("\\n").join("<br />").split("&lt;").join("<");
  let content = post.body.split("\\n").join("<br />").split("&lt;").join("<");

  if (comments.length > 0) {
  }



  let reloadCommentList = () => {
    axios
      .get(`https://limitless-sierra-67996.herokuapp.com/v1/comments?postId=${postId}`)
      .then((res) => {
        setComments(res.data.results);
        setCommentPageNumber(1);
        setCommentHasMore(false);
      });
  };

  const removePost = (id) => {
    if (id && id.length > 0) {
      axios
        .delete("https://limitless-sierra-67996.herokuapp.com/v1/posts/" + id)
        .then((response) => {
          if (response.status == 204) {
            console.log("remove success, id: " + id);
            history.push("/");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
  };

  const addReply = (newReply) =>{
    console.log('newReply', newReply);
    setComments([...comments, newReply]);
    setTotalCommentCount(totalCommentCount + 1);
  }

  return (
    <div>
      <Header
        id={props.match.params.id}
        onRemove={() => setDeletePopupOpen(true)}
      />
      <Container className={styles.container}>
        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>

        <div className={styles.informationArea}>
          <span className={styles.date}>
            {formatDate(post.updatedAt, true)}
          </span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <TagList tags={post.tags} className={styles.tagArea} />
        )}

        <div
          className={styles.contents}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <CommentList
          comments={comments}
          postId={postId}
          reloadCommentList={reloadCommentList}
          hasMore={commentHasMore}
          getCommentList={getCommentList}
          totalCommentCount={totalCommentCount}
          addReply={addReply}
        />
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
