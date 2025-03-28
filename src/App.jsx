import { useState } from "react";
export default function App() {
  const names = ["it", "anathole","afanyu"];
  const [allnames, setAllnames]=useState(names);
  const [newName,setnewName]=useState()
  const [error, setError]=useState(false)
  // function for deleting
  const deletename = (dname)=>{
    const update= allnames.filter((data)=>data != dname);
    setAllnames(update)
  }
  // function for adding
  function addNewName(){
    if(!newName){
      alert("name required")
      setError(true)

      return
    }
    setAllnames([...allnames,newName]);
  }
  

  return(
    <>
     <div className=" w-screen flex justify-center gap-[1cm] p-10">
    <div className="form bg-blue-100 w-[50%] p-5 flex justify-center shadow-2xl">
      <div>
      <h1 className="block text-center w-full mb-3 text-2xl">Add new name</h1>
      {error&&
      
      <div className="p-2 bg-red-200 text-red-600">Name required</div>
      }

      <input type="text" value={newName} onChange={(e)=>setnewName(e.target.value)} placeholder="ADD NEW ITEM" className="w-full outline-blue-300 p-2" />
      <button onClick={addNewName} className="w-full p-2 bg-blue-400 text-white mb-3 mt-3">Add name</button>

      </div>

    </div>
      <div className="  flex justify-center w-[50%]">
        <table className="w-full">
          <tr className="bg-gray-300 p-4 ">
            <th className=" text-white border-1 border-black">No.</th>
            <th className=" text-white border-1 border-black">Names</th>
            <th className=" text-white border-1 border-black">Action</th>
          </tr>
         <tbody>

            {allnames.map((name,index)=>(
               <tr className="bg-gray-600 text-white border-1 border-white ">
               <td className="border-1 border-white text-center">{index+1}</td>
               <td className="border-1 border-white text-center">{name}</td>
               <td className="flex justify-center"><button onClick={()=>deletename(name)} className="p-2  text-red-600 bg-red-200 border-1 border-white">delete</button></td>
             </tr>
            ))}
           
         </tbody>
         
        </table>
      </div>
      </div>
    </>
  )
  
}