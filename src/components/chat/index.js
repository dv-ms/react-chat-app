import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Card, Form, Button } from 'react-bootstrap'

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

  function fetchChats() {
    fetch('https://run.mocky.io/v3/55bbeb76-8f2e-49b4-866c-0894f73c5680', {
      headers: {
        Accept: 'accept-header',
        Authorization: currentUser.auth_token,
      },
    })
      .then((response) => response.json())
      .then(
        (success) => {
          if (success.status_code === 200) {
            console.log(success)
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

  useEffect(() => {
    fetchChats()
  }, [])

  function logout() {
    let yes = window.confirm('Are you sure you want to logout?')
    if (yes) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('user_name')
      localStorage.removeItem('user_phone')
      window.location.href = '/'
    }
  }

  return (
    <Container className='pt-4'>
      <Row className='mb-4'>
        <Col sm={3}>
          <Row>{currentUser.name}</Row>
          <Row>{currentUser.phone}</Row>
        </Col>
        <Col sm={9}>
          <Row>
            <Col sm={9}></Col>
            <Col sm={2}>
              <Button variant='danger' onClick={() => logout()}>
                Logout
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm={3} className={'rounded-3 border-2 border '}>
          <Row className={'border border-bottom-2'}>
            <div>
              <h5>Chats</h5>
            </div>
          </Row>
          {chats.map((chat, index) => {
            return (
              <Row
                key={index}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setCurrentChatUser(chat.user)
                  setMessages(chat.messages)
                  setMessage({
                    ...message,
                    type: 'text',
                    message: '',
                  })
                }}
                className={
                  chat.user.id === currentChatUser.id
                    ? 'bg-warning p-3 border border-bottom-3'
                    : 'bg-white p-3 border border-bottom-3'
                }
              >
                <p>{chat.user.name}</p>
              </Row>
            )
          })}
        </Col>
        <Col sm={9}>
          <Row>
            <div>
              <h5>Messages</h5>
            </div>
          </Row>
          {messages.map((message, index) => {
            return (
              <Row
                style={{ width: '100%' }}
                className={
                  message.from_id === currentUser.id
                    ? 'justify-content-end'
                    : 'justify-content-start'
                }
              >
                <p>{message.message}</p>
              </Row>
            )
          })}
          <Row>
            <Form className='mt-4'>
              <Form.Group className='mb-3' controlId='formBasicMessage'>
                <Form.Control
                  value={message.message}
                  name='message'
                  type='text'
                  placeholder={'Message ' + currentChatUser.name}
                  onChange={(e) => {
                    setMessage({
                      ...message,
                      type: 'text',
                      message: e.target.value,
                    })
                  }}
                />
              </Form.Group>

              <Button
                variant='success'
                type='button'
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                Send
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
export default Chat
