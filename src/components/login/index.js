import React, { useState } from 'react'

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
    <>
      <section>
        <h1>Login</h1>
        <input
          type='number'
          name='phone'
          placeholder='Phone number'
          max={9999999999}
          onChange={(e) => {
            setUserDetails(e)
          }}
        />
        <input
          type='number'
          name='pin'
          placeholder='4 digit PIN'
          max={9999}
          onChange={(e) => setUserDetails(e)}
        />
        <button type='button' className='' onClick={() => submitForm('login')}>
          Login
        </button>
      </section>

      <section>OR</section>

      <section>
        <h1>Register</h1>
        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={(e) => setUserDetails(e)}
        />
        <input
          type='number'
          name='phone'
          placeholder='Phone number'
          max={9999999999}
          onChange={(e) => setUserDetails(e)}
        />
        <input
          type='number'
          name='pin'
          placeholder='4 digit PIN'
          max={9999}
          onChange={(e) => setUserDetails(e)}
        />
        <button
          type='button'
          className=''
          onClick={() => submitForm('register')}
        >
          Register
        </button>
      </section>
    </>
  )
}
export default Login
