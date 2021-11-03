import React from "react";
import { Route } from "react-router-dom";
import { Home, PostDetailPage, CreatePostPage, EditPostPage } from "./pages";
import { Container} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <Container>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/:id" component={PostDetailPage} />
        <Route path="/post/create" component={CreatePostPage} />
        <Route path="/posts/:id/edit" component={EditPostPage} />
      </div>
    </Container>
  );
}

export default App;
