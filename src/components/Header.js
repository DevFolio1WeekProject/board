import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import classes from './Header.module.css'

let Header = () => {
  const history = useHistory();

  let handleWrite = () => {
    console.log('handleWrite');
    history.push('/post/create');
  }

  return (
    <header className={classes.header}>
      <div className={classes.header_wrap}>
        <div><a style={{ cursor: 'pointer' }} onClick={() => { console.log('pyush'); history.push('/') }}><img src="/velog.png" style={{ width: '100px', height: '50px' }}></img></a></div>

        <div>
          <Button onClick={handleWrite} primary>글쓰기</Button>
        </div>
      </div>

    </header>
  )

}


export default Header;
