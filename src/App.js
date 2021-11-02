import React from "react";
import { Route } from "react-router-dom";
import { Home, PostDetailPage, CreatePostPage, EditPostPage } from "./pages";

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/posts/:id" component={PostDetailPage} />
      <Route path="/post/create" component={CreatePostPage} />
      <Route path="/posts/:id/edit" component={EditPostPage} />
    </div>
  );
}

export default App;
