import { ToDoList } from "./components/ToDoList";
// import { NewToDoList } from "./components/NewToDoList"
export default function App(){
  return(
    <div className="w-screen h-screen p-16 bg-gray-300">
      <ToDoList/>
    </div>
  )
}