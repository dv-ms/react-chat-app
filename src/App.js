import './App.css'

import Login from './components/login'
import Chat from './components/chat'

const user_logged_in = () => {
  return localStorage.getItem('auth_token') == null
}

function App() {
  if (user_logged_in()) {
    return <Login />
  } else {
    return <Chat />
  }
}

export default App
