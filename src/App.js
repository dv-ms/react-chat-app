import './App.css'

import Login from './components/login'
import Chat from './components/chat'

const user_logged_in = () => {
  let auth_token = localStorage.getItem('auth_token')
  return auth_token !== null
}

function App() {
  if (user_logged_in()) {
    return <Chat />
  } else {
    return <Login />
  }
}

export default App
