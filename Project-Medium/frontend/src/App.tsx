import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { AuthorsBlogs} from './pages/AuthorsBlogs'
import { Edit } from './pages/Edit'
import { Updateblogs } from './pages/Updateblogs'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Blog/:id" element={<Blog />} />
          <Route path ="/Blogs" element={<Blogs/>} />
          <Route path ="/Publish" element={<Publish/>}/>
          <Route path = "/author/:name" element={<AuthorsBlogs/>}/>
          <Route path ="/edit/:id" element={<Edit/>}/>
          <Route path ="/updateblogs/:id" element={<Updateblogs />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

