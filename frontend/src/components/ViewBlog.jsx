import { useState, useEffect } from "react";
import axios from "axios";

import Blog from "./Blog";

export default function ViewBlog() {
  const [blogs, setBlogs] = useState(null);
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    axios
      .get("http://localhost:3000/blog")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    axios
      .get("http://localhost:3000/blog")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModified]);

  const handleBlogDeletion = async ({ _id, message }) => {
    console.log("delete button pressed");

    axios
      .post("http://localhost:3000/delete", {
      _id: _id,
      message: message,
    })
      .then(res => {
        console.log(res)
        setIsModified(prev => !prev);
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleBlogUpdate = ({_id, newMessage }) => {
    axios
      .post("http://localhost:3000/update", {
        _id: _id,
        message: newMessage
      })
      .then(res => {
        setIsModified(prev => !prev)
      })
      .catch(err => {
        console.log(err)
      })
  } 

  return (
    <div>
      Your Blogs:
      {blogs
        ? blogs.map((blog) => {
            console.log(blog);
            return (
              <Blog
                key={blog._id}
                message={blog.message ? blog.message : blog.messsage}
                _id={blog._id}
                handleBlogDeletion={handleBlogDeletion}
                handleBlogUpdate={handleBlogUpdate}
              />
            ); // idk why this is happenning
          })
        : "nothing to show"}
    </div>
  );
}
