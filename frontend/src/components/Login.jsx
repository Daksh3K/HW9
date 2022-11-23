import { useState, useContext } from "react";

import { AuthContext } from "../App";

export default function Login() {
  const [password, setPassword] = useState("");
  const { token, handleLogin } = useContext(AuthContext);

  const handleSubmit = (event) => {
    handleLogin(password);
    event.preventDefault()
  };

  const handleChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      {token ? (
        <div> You are already logged in! </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input value={password} type="password" onChange={handleChange}/>
          <input type="submit" value="Submit" />
        </form>
      )}
    </div>
  );
}
