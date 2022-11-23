import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { AuthContext } from "../App";

export default function AddBlog() {
  const [message, setMessage] = useState("Enter your blog here!");

  const { token } = useContext(AuthContext);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleBlogCreation = (event) => {
    // do post request with message contents
    axios
      .post("http://localhost:3000/blog/create-post", {
        message: message,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  };

  return (
    <div>
      {token ? (
        <form onSubmit={handleBlogCreation}>
          <label htmlFor="input">
            Blog:
            <textarea
              id="input"
              cols="30"
              rows="10"
              value={message}
              onChange={handleMessageChange}
            ></textarea>
          </label>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <div>
          Out must be logged in to post blogs! Log in <Link to="/login">Here</Link>
        </div>
      )}
    </div>
  );
}
