import { useState, useEffect } from "react";

export function ToDoList() {
//   state varialble to store the array 
const [allDoList,setallDoList]=useState(()=>{
    // variable to load the the array from the localstorage
    const savedItems = localStorage.getItem("toDoList");
    if (savedItems){
        return JSON.parse(savedItems);
    }else{
        return [];
    }

})
useEffect(()=>{
    localStorage.setItem("toDoList", JSON.stringify(allDoList))

},[allDoList])
const [showConfirm,setShowConfirm]=useState(false)
const [newDoList,setnewDoList]=useState()
const [error, setError]=useState(null)
const [taskStatus, setTaskStatus] = useState(Array(allDoList.length).fill(null));

// const [taskStatus, setTaskStatus] = useState(Array(allDoList.length).fill(null));
    
    // function for deleting
    const handleDelete = ()=>{
        setShowConfirm(true)
        setTimeout(() =>setShowConfirm(false),2000)
    }
   
const confirmDelete = (ditem)=>{
    const update = allDoList.filter((data)=> ditem!==data)
    setallDoList(update)

}
const nodelete = ()=>{
    setShowConfirm(false)
}
// function for adding
   function addToDoList() {
    setShowConfirm(false)
    // check if the input is not empty
    if(!newDoList){
        setError("Please enter a todo item");
    
        return
    }else{
         // add the new todo item to the todo list

        setallDoList([...allDoList,newDoList])
    }

}

 // Function to mark task as done
const markAsDone = (index) => {
    const updatedStatus = [...taskStatus];
    updatedStatus[index] = "done";
    setTaskStatus(updatedStatus);


   
};

// Function to mark task as not done
const markAsNotDone = (index) => {
    const updatedStatus = [...taskStatus];
    updatedStatus[index] = "not done";
    setTaskStatus(updatedStatus);


   
};

   

    return(
        
            <div className="bg-white w-full h-full rounded-4xl shadow-2xl border-none p-4 px-6">
                <hr className="text-purple-400 font-bold mb-3" />
                <div className="flex justify-evenly h-[] gap-4 w-full">
                    <div className="adding w-[40%] h-[50%] ">
                        <div className="rounded-xl w-full bg-gray-100 shadow-2xl  border-none p-4">
                        <h1 className="text-center text-2xl font-bold text-purple-400">ADD TO DO LIST</h1>
                        {error&&
                        <div className="p-3 bg-red-200 rounded-md text-red-500">Field required</div>
                        }
                        <input type="text" value={newDoList} placeholder="Enter your To do list" onChange={(e)=>setnewDoList(e.target.value)} className="w-full block mb-3 mt-4 p-3 border-2 border-purple-300 rounded-b-md outline-purple-300"/>
                       
                        <button onClick={addToDoList} className="bg-purple-300 rounded-2xl text-white font-bold text-center w-full p-3 shadow-2xl cursor-pointer hover:scale-[1.04] duration-200 hover:bg-purple-400">➕ Add</button>
                        </div>
                        <div className="p-4 bg-purple-100 w-full mt-5 ">
                            <h1 className="font-bold block mb-3 ml-2 text-blue-500 text-2xl">Total tasks:</h1>
                            <div className="p-8 rounded-full bg-purple-700 w-[18%]"> 
                                <p className="text-6xl font-bold text-white block text-center ">{allDoList.length}</p>
                                 </div>

                        </div>
                    </div>
                    <div className="table shadow-2xl w-[60%]  ">
                       

                        <table className="w-full p-3 rounded-2xl ">

                            <tr className="  bg-gray-100 p-3 ">

                            <th className="text-purple-400 font-bold p-2 border-1 border-purple-300">N<sup>o</sup></th>

                                <th className="text-purple-400 font-bold p-2 border-1 border-purple-300">Task</th>

                                <th className="text-purple-400 font-bold p-2 border-1 border-purple-300">Status</th>

                            </tr>
                            <tbody>
                              

                            {allDoList.map((item,index)=>(   

                                <tr className= "bg-white">
                                                                       
                                    <td  className="text-gray-600 text-center border-1 border-purple-300 font-bold w-[10%] p-2" >{index+1}</td>

                                    <td  className="text-gray-600 text-center border-1 border-purple-300 font-bold w-[60%] p-2" >{item}</td>

                                    <td  className="text-gray-600 text-center border-1 border-purple-300 font-bold p-2 flex justify-center gap-3 " >

<button onClick={() => markAsDone(index)} className={`${taskStatus[index] === "done" ? "p-2 bg-green-400 text-white rounded-md border-1 border-green-200" : "bg-gray-200 p-2 rounded-md"}`}>Done</button>
<button onClick={() => markAsNotDone(index)} className={`${taskStatus[index] === "not done" ? "p-2 bg-red-400 text-white rounded-md border-1 border-red-200" : ""}`}>not Done</button>


                                        <button onClick={()=>handleDelete()} className="p-2 bg-transparent border-1 border-red-200">❌</button>
                                     {showConfirm && 
                                         <div className="p-3 pt-10 px-5 absolute bg-gray-50 rounded-md backdrop-blur-2xl  mb-4 w-[20%] left-[18cm] top-[10cm]">
                                             <p className="text-purple-400">Are you sure you want to delete</p>
                                             <div className="mainbtn flex justify-center mt-6 mb-3">
                                             <div className="confirm gap-3 flex ">
                                          <button onClick={()=>confirmDelete(item)} className="p-2 bg-red-400 border-1 text-white border-red-400 rounded-md ">Yes</button>
                                              <button onClick={()=>nodelete()} className="p-2 bg-blue-400 border-1 text-white border-blue-400 rounded-md">No</button>
                                             </div>
                                             </div>
                                             </div>
                                      }
                                       

                                        <button className="p-2 bg-transparent border-1 border-blue-200">📝</button>

                                    </td>
                                   
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

      
        
    
    )
}
