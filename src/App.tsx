import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import ToDoCreation from './packages/Todo-Creation.component'
const ToDoList  = React.lazy(()=>import('ToDoList/TodoList'))
const App = () => (
  <div className="container">
   
    <ToDoCreation />
    <ToDoList />
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
