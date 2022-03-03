import Post from "./pages/Post";
import PostList from "./PostList"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" exact={true} element={<PostList />} />
      <Route path="/post/:id" element={<Post />}/>
    </Routes>
    </Router>
  );
}

export default App;
