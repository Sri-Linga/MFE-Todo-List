import React, { useState } from 'react';
import { ToDoListItem } from './interfaces';
import "./Todo-Creation.scss"

const ToDoCreation = () => {

    const [toDoInput, setToDoInput] = useState<ToDoListItem>({ task: "", description: "",status:false })
    const [errorMessage,setErrorMessage]=useState("")
    const handleSubmit=()=>{
        const listItems=localStorage.getItem('toDotasks')!==null?JSON.parse(localStorage.getItem('toDotasks')||""):null
        const toDotasks = listItems!==null?[...listItems,toDoInput]:[toDoInput]
        if(toDoInput.task!==""){
            try{
                localStorage.setItem('toDotasks',JSON.stringify(toDotasks))
                window.dispatchEvent(new Event('storage'))
                setToDoInput({ task: "", description: "",status:false })
            }
            catch(e){
                setToDoInput({ task: "", description: "",status:false }) 
                throw new Error("Local Storage Not Available")
            }
        }else{
            setErrorMessage("Task is Mandatory *")
        }
       
    }
    return (
        <div className='todo-form'>
            <p className='title'>Get things done!</p>
            <div className='form-control'>
                <input type="text" value={toDoInput?.task} placeholder='What is the task today? *' className='form-input' onChange={(e) => setToDoInput({ ...toDoInput, task: e.target.value })} />
            </div>
            <div className='form-control'>
                <textarea rows={3} value={toDoInput?.description}  placeholder='Give some description' className='form-input' onChange={(e) => setToDoInput({ ...toDoInput, description: e.target.value })} />
            </div>
            <button onClick={()=>handleSubmit()} className='form-submit'>Add Task</button>
            {errorMessage!==""&&<p className='error'>{errorMessage}</p>}
        </div>
    )
}

export default ToDoCreation;