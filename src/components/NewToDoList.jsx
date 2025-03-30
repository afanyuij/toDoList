import { useState } from "react";

export function NewToDoList() {
    // State for the list of tasks
    const [allDoList, setAllDoList] = useState([]);
    const [newDoList, setNewDoList] = useState("");
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    // Function to add a new task to the list
    const addToDoList = () => {
        if (!newDoList.trim()) {
            setError("Please enter a task.");
            return;
        }
        setAllDoList([...allDoList, { task: newDoList, status: "notDone" }]);
        setNewDoList("");
        setError(null);
    };

    // Function to mark task as done
    const markAsDone = (index) => {
        const updatedList = [...allDoList];
        updatedList[index].status = "done";
        setAllDoList(updatedList);
    };

    // Function to mark task as not done
    const markAsNotDone = (index) => {
        const updatedList = [...allDoList];
        updatedList[index].status = "notDone";
        setAllDoList(updatedList);
    };

    // Function to handle task deletion
    const handleDelete = () => {
        setShowConfirm(true);
    };

    const confirmDelete = (item) => {
        setAllDoList(allDoList.filter((task) => task !== item));
        setShowConfirm(false);
    };

    const nodelete = () => {
        setShowConfirm(false);
    };

    return (
        <div className="bg-white w-full h-full rounded-4xl shadow-2xl border-none p-4 px-6">
            <h1 className="p-3 mb-3 mt-3 font-bold text-purple-400 block text-center text-4xl">MY TO DO LIST</h1>
            <hr className="text-purple-400 font-bold mb-3" />
            <div className="flex justify-evenly gap-4 w-full">
                <div className="adding w-[40%] rounded-xl bg-gray-100 shadow-2xl h-[50%] p-4">
                    <h1 className="text-center text-2xl font-bold text-purple-400">ADD TO DO LIST</h1>
                    {error && <div className="p-3 bg-red-300 text-red-500">{error}</div>}
                    <input
                        type="text"
                        value={newDoList}
                        placeholder="Enter your To do list"
                        onChange={(e) => setNewDoList(e.target.value)}
                        className="w-full block mb-3 mt-4 p-3 border-2 border-purple-300 rounded-b-md outline-purple-300"
                    />
                    <button
                        onClick={addToDoList}
                        className="bg-purple-300 rounded-2xl text-white font-bold text-center w-full p-3 shadow-2xl cursor-pointer hover:scale-[1.04] duration-200 hover:bg-purple-400"
                    >
                        ➕ Add
                    </button>
                </div>

                <div className="table shadow-2xl w-[60%]">
                    <table className="w-full p-3 rounded-2xl">
                        <thead>
                            <tr className="bg-gray-100 p-3">
                                <th className="text-purple-400 font-bold p-2 border-1 border-purple-300">N<sup>o</sup></th>
                                <th className="text-purple-400 font-bold p-2 border-1 border-purple-300">Task</th>
                                <th className="text-purple-400 font-bold p-2 border-1 border-purple-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allDoList.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        item.status === "done" ? "bg-green-200" : item.status === "notDone" ? "bg-red-200" : "bg-white"
                                    }`}
                                >
                                    <td className="text-gray-600 text-center border-1 border-purple-300 font-bold p-2">{index + 1}</td>
                                    <td className="text-gray-600 text-center border-1 border-purple-300 font-bold p-2">{item.task}</td>
                                    <td className="text-gray-600 text-center border-1 border-purple-300 font-bold p-2 flex justify-center gap-3">
                                        <button
                                            onClick={() => markAsDone(index)}
                                            className="p-2 bg-green-100 rounded-md border-1 border-green-200"
                                        >
                                            ✅
                                        </button>
                                        <button
                                            onClick={() => markAsNotDone(index)}
                                            className="p-2 bg-red-100 rounded-md border-1 border-red-200"
                                        >
                                            Not Done
                                        </button>
                                        <button onClick={handleDelete} className="p-2 bg-transparent border-1 border-red-200">
                                            ❌
                                        </button>
                                        {showConfirm && (
                                            <div className="p-3 pt-10 px-5 absolute bg-gray-50 rounded-md backdrop-blur-2xl mb-4 w-[20%] left-[18cm] top-[10cm]">
                                                <p className="text-purple-400">Are you sure you want to delete</p>
                                                <div className="mainbtn flex justify-center mt-6 mb-3">
                                                    <div className="confirm gap-3 flex ">
                                                        <button
                                                            onClick={() => confirmDelete(item)}
                                                            className="p-2 bg-red-400 border-1 text-white border-red-400 rounded-md"
                                                        >
                                                            Yes
                                                        </button>
                                                        <button
                                                            onClick={nodelete}
                                                            className="p-2 bg-blue-400 border-1 text-white border-blue-400 rounded-md"
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <button className="p-2 bg-transparent border-1 border-blue-200">📝</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
