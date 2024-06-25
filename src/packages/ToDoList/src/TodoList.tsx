import React, { useEffect, useState } from "react";
import "./Todo-List.scss"

const ToDoList = () =>{
    const [listItems,setListItems]=useState([]);
    const [filteredListItems,setFilteredListItems]=useState([]);
    const [filterStatus,setFilterStatus]=useState("all");
   
    useEffect(() => {
        const refetch=()=>{
            if(localStorage.getItem('toDotasks')!==null){
            const listItems=JSON.parse(localStorage.getItem('toDotasks')||"")
            setListItems(listItems)
            }
        }
        refetch();
        window.addEventListener("storage", () => {
          refetch();
        });
    
        return () => {
          window.removeEventListener("storage",refetch);
        };
    }, []);
    useEffect(()=>{
        if(filterStatus=="all"){
            setFilteredListItems(listItems)
        } else if(filterStatus=="active"){
            const filtered=listItems.filter((item)=>item.status==false)
            setFilteredListItems(filtered)
        } else if(filterStatus=="completed"){
            const filtered=listItems.filter((item)=>item.status)
            setFilteredListItems(filtered)
        }
    },[filterStatus,listItems])
    const handleStatusChange=(e:React.ChangeEvent<HTMLInputElement>,index:number)=>{
        const {checked} =e.target;
        const listItemsToUpdate=JSON.parse(JSON.stringify(listItems));
        listItemsToUpdate[index].status=checked;
        setListItems(listItemsToUpdate);
        setFilteredListItems(listItems);
        localStorage.setItem('toDotasks',JSON.stringify(listItemsToUpdate))
        window.dispatchEvent(new Event('storage'))
    }
    return(
        <div className="todo-list">
            <p className="title">To-Do List.</p>
            <div className="filter-bar">
                <div className="filter-box">
                    <p>Filter:</p>
                    <select onChange={(e)=>setFilterStatus(e.target.value)}>
                        <option value={'all'}> All</option>
                        <option value={'active'}> Active</option>
                        <option value={'completed'}> Completed</option>
                    </select>
                </div>
            </div>
            {filteredListItems?.map((item,index)=><div className={`list-item ${item.status?'done':''}`}>
                <div>
                <p className="task">{item?.task}</p>
                <p className="description">{item?.description}</p>
                </div>
                <div className="status-bar">
                <input type={"checkbox"} className="checkbox" checked={item.status} onChange={(e)=>handleStatusChange(e,index)} />
                </div>
            </div>)}
        </div>
    )
}

export default ToDoList;