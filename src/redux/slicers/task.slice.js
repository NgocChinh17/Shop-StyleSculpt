import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

const initialState = {
  taskList: JSON.parse(localStorage.getItem("taskList")) || [],
}

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    addTask: (state, action) => {
      const { data } = action.payload
      const newTask = {
        id: uuidv4(),
        title: data.title,
        content: data.content,
      }
      const newTaskList = [newTask, ...state.taskList]
      state.taskList = newTaskList
      localStorage.setItem("taskList", JSON.stringify(newTaskList))
    },
    updateTask: (state, action) => {
      const { id, data } = action.payload
      const newTaskList = [...state.taskList]
      const index = newTaskList.findIndex((item) => item.id === id)
      newTaskList.splice(index, 1, {
        id: newTaskList[index].id,
        title: data.title,
        content: data.content,
      })
      state.taskList = newTaskList
      localStorage.setItem("taskList", JSON.stringify(newTaskList))
    },
    deleteTask: (state, action) => {
      const { id } = action.payload
      const newTaskList = state.taskList.filter((item) => item.id !== id)
      state.taskList = newTaskList
      localStorage.setItem("taskList", JSON.stringify(newTaskList))
    },
  },
})

export const { addTask, updateTask, deleteTask } = taskSlice.actions

export default taskSlice.reducer
