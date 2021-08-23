import React, { useState } from 'react'
import { Container, Col, Row, Card, Form, Button } from 'react-bootstrap'

function Login() {
  const [user, setUser] = useState({ name: '', phone: '', pin: '' })

  const setUserDetails = (e) => {
    setUser((prevState) => {
      prevState[`${e.target.name}`] = e.target.value
      return prevState
    })
  }

  const submitForm = (type) => {
    let url =
      type === 'login'
        ? 'https://run.mocky.io/v3/5ce37ebe-859d-40e9-b147-dcb53a8cdb14'
        : 'https://run.mocky.io/v3/5d0be438-5eef-4735-9d82-19e5cc2991cd'
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'accept-header',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then(
        (success) => {
          alert(success.message)
          if (success.status_code === 201 || success.status_code === 200) {
            localStorage.setItem('auth_token', success.user.auth_token)
            localStorage.setItem('user_id', success.user.id)
            localStorage.setItem('user_name', success.user.name)
            localStorage.setItem('user_phone', success.user.phone)
            window.location.reload()
          }
        },
        (error) => {
          alert('Error: ' + error.message)
        }
      )
  }

  return (
    <Container fluid='md' className='mt-5'>
      <Row>
        <Col md={5}>
          <Card>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                For already registered users
              </Card.Subtitle>
              <Form className='mt-4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    name='phone'
                    type='number'
                    placeholder='Enter phone number'
                    max={9999999999}
                    onChange={(e) => {
                      setUserDetails(e)
                    }}
                  />
                  <Form.Text className='text-muted'>
                    We'll never share your phone number with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>PIN</Form.Label>
                  <Form.Control
                    type='password'
                    name='pin'
                    placeholder='4 digit PIN'
                    max={9999}
                    onChange={(e) => setUserDetails(e)}
                  />
                </Form.Group>

                <Button
                  variant='success'
                  type='button'
                  onClick={() => submitForm('login')}
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={2}>
          <Card>
            <Card.Body>
              <Card.Title>or</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card>
            <Card.Body>
              <Card.Title>Register</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                For un-registered users
              </Card.Subtitle>

              <Form className='mt-4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    name='name'
                    type='text'
                    placeholder='Enter your full name'
                    onChange={(e) => {
                      setUserDetails(e)
                    }}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    name='phone'
                    type='number'
                    placeholder='Enter phone number'
                    max={9999999999}
                    onChange={(e) => {
                      setUserDetails(e)
                    }}
                  />
                  <Form.Text className='text-muted'>
                    We'll never share your phone number with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>PIN</Form.Label>
                  <Form.Control
                    type='password'
                    name='pin'
                    placeholder='4 digit PIN'
                    max={9999}
                    onChange={(e) => setUserDetails(e)}
                  />
                </Form.Group>

                <Button
                  variant='primary'
                  type='button'
                  onClick={() => submitForm('register')}
                >
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
export default Login
