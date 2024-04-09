import List from "./components/List";
import Form from "./components/Form"
import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "./api/api"
import uuid from "react-uuid";

function App() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchTask = async() => {
        setLoading(true);
        const res = await api.get('/todolist')


        setTasks(res.data)
        setLoading(false);
    }
    useEffect(() => {
        fetchTask()
    }, [])

    const addNewTask = async(task) => {
        const newTask = {
            id: uuid(),
            task: task,
            complete: false
        }
        const res = await api.post("/todolist", newTask)

        setTasks([...tasks, res.data])
        console.log(res);
    }

    const deleteTask = async(taskId) => {
        const res = await api.delete(`/todolist/${ taskId }`)
        console.log(res);

        if (res.statusText === 'OK') {
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    }

    const updateTask = async(taskId, complete) => {
        const res = await api.patch(`/todolist/${taskId}`, {
                complete
            })
            // setTasks(tasks.filter(task => task.id !== taskId));
            // setTasks([...tasks, res.data])
        setTasks(tasks.map((task) => {
            if (task.id === taskId) {
                return {
                    id: task.id,
                    task: task.task,
                    complete: !task.complete
                }
            }
            return task
        }))
    }

    return ( <
        >
        <
        div className = "w-full h-screen bg-zinc-800 flex flex-col gap-y-12 justify-center items-center" >
        <
        h1 className = "text-4xl text-center text-gray-300 font-bold" > To Do List < /h1> <
        Form addNewTask = { addNewTask }
        / > {
        loading ? < h1 className = "text-2xl text-center my-4 text-gray-300" > Loading.... < /h1> : <
        List tasks = { tasks }
        deleteTask = { deleteTask }
        updateTask = { updateTask }
        / >
    } < /
    div >

        <
        / >
);
}

export default App;