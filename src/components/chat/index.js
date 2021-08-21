import React, { useState } from 'react'

function Chat() {
  let currentUserObj = {
    id: localStorage.getItem('user_id'),
    name: localStorage.getItem('user_name'),
    phone: localStorage.getItem('user_phone'),
    auth_token: localStorage.getItem('auth_token'),
  }

  let currentChatUserObj = {
    id: -1,
    name: '',
    phone: '',
  }
  const [currentUser, setCurrentUser] = useState(currentUserObj)
  const [currentChatUser, setCurrentChatUser] = useState(currentChatUserObj)
  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState({
    type: 'text',
    message: '',
    from_id: currentUser.id,
    to_id: currentChatUser.id,
    sentTime: null,
    recievedTime: null,
    seenTime: null,
  })

  const fetchChats = () => {
    fetch('https://run.mocky.io/v3/55bbeb76-8f2e-49b4-866c-0894f73c5680', {
      headers: {
        Accept: 'accept-header',
        Authorization: currentChatUser.auth_token,
      },
    })
      .then((response) => response.json())
      .then(
        (success) => {
          if (success.status_code === 200) {
            setChats(success.chats)
            if (success.chats.length !== 0) {
              setCurrentChatUser(success.chats[0].user)
              setMessages(success.chats[0].messages)
            }
          } else {
            alert(success.message)
          }
        },
        (error) => {
          alert('Error fetching chats: ' + error.message)
        }
      )
  }

  fetchChats()

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-9'></div>
      </div>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-9'></div>
      </div>
    </div>
  )
}
export default Chat
