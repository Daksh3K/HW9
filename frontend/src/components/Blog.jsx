import { useState } from 'react';

export default function Blog({message, _id, handleBlogDeletion, handleBlogUpdate}) {

  const [newMessage, setNewMessage] = useState("")

  const handleDeleteButtonClick = () => {
    handleBlogDeletion( {_id, message } )
  }

  const handleBlogChange = (e) => {
    setNewMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBlogUpdate({ _id, newMessage })
    setNewMessage('')
  }

  return (
    <div style={{border: "solid 2px black", width: "20rem", height: "12rem"}}>
      <div>{message}</div>
      <button onClick={handleDeleteButtonClick}>Delete</button>

      <form onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={handleBlogChange} />
        <input type="submit" value="Update"/>
      </form>
    </div>
  )
}