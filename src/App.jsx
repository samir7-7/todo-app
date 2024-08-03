import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {

    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => {
      return i.id === id;
    });
    setTodo(t[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id != id;
    })
    setTodos(newTodos);
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    })
    setTodos(newTodos);
    saveToLS()
  }

  const handleSave = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  return (
    <div className='flex flex-col items-center gap-7 w-screen h-screen'>
      <Navbar />
      <div className="container bg-blue-100 flex flex-col items-center rounded-xl p-4 px-7 py-8 gap-5 min-h-[80vh]">
        <div className="addtodo flex flex-col gap-2 justify-center items-center">
          <h2 className=' text-lg font-bold'>Add Todo</h2>
          <div className="inputs flex gap-3 w-full">
            <input onChange={handleChange} value={todo} type="text" placeholder='Add a todo' className='min-w-full px-3' />
            <button onClick={handleSave} disabled={todo.length<3} className='bg-blue-500 text-white disabled:bg-blue-300 p-2 rounded px-4'>Save</button>
          </div>
        </div>

        <div className="todos flex flex-col items-center gap-3 w-[100%]">
          <h2 className=' text-lg font-bold'>Your Todos</h2>
          {todos.length === 0 && <div className='text-gray-500'>No Todos to display</div>}
          {todos.map(item => {
            return <div key={item.id} className="todo flex gap-2 w-1/2 justify-between">
              <div className='flex gap-5 h-fit items-center'>
                <input name={item.id} type="checkbox" checked={item.isCompleted} onChange={(e) => {
                  let id = e.target.name;
                  let index = todos.findIndex((e) => {
                    return e.id === id;
                  })

                  let newTodos = [...todos];
                  newTodos[index].isCompleted = !newTodos[index].isCompleted;
                  setTodos(newTodos)
                  saveToLS( )
                }} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}
                </div>
              </div>
              <div className="buttons flex gap-2 max-h-8">
                <button className='bg-blue-500 text-white p-1 rounded px-3' onClick={(e) => handleEdit(e, item.id)}>Edit</button>
                <button className='bg-red-500 text-white p-1 rounded px-3' onClick={(e) => { handleDelete(e, item.id) }}>Delete</button>
              </div>
            </div>
          })}

        </div>
      </div>
    </div>
  )
}

export default App
