import GetAllPosts from "./getAllPosts.js";
import DisplaySinglePost from "./getPostById.js";
import CreatePost from "./createPost.js";
import Login from "./login.js";

function App() {

  return (
    <>
      <h1>GROUPOMANIA</h1>
      <div id="parent"></div>
      <Login />
      <GetAllPosts />
      <CreatePost />
      <DisplaySinglePost />
    </>
  );
}

export default App;
