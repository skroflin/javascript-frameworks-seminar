import { useState } from 'react'
import { TodoList } from './components/TodoList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Todo app</h1>
      <TodoList />
    </div>
  )
}

export default App
