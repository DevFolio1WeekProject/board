import { Button } from "semantic-ui-react";
import { useHistory, useLocation } from "react-router-dom";
import classes from "./Header.module.css";
import axios from "axios";

let Header = props => {
  const { id, onRemove } = props;
  const history = useHistory();
  const location = useLocation();

  let handleWrite = () => {
    console.log("handleWrite");
    if (location.pathname.includes("posts")) {
      history.push(location.pathname + "/edit");
    } else {
      history.push("/post/create");
    }
  };

  let buttonText = location.pathname.includes("posts") ? "글수정" : "글쓰기";

  return (
    <header className={classes.header}>
      <div className={classes.header_wrap}>
        <div>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log("push");
              history.push("/");
            }}
          >
            <img
              src="/velog.png"
              style={{ width: "100px", height: "50px" }}
            ></img>
          </a>
        </div>

        <div>
          {id && (
            <Button onClick={e => onRemove(id)} color="red">
              삭제하기
            </Button>
          )}
          <Button onClick={handleWrite} primary>
            {buttonText}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
