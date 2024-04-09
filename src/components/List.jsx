import React from 'react'
import { BiX } from "react-icons/bi";
import Card from './Card';
const List = ({tasks,deleteTask,updateTask}) => {
  return (
    <ul className='list-none w-full md:w-1/3 flex flex-col gap-y-4'>
        
      <Card tasks={tasks} deleteTask={deleteTask} updateTask={updateTask}/>
        
    </ul>
  )
}

export default List
