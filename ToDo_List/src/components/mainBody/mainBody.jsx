import {useState} from "react";
import Tasks from "../tasks/Tasks";
import TasksHead from "../tasksHead/tasksHead";
import TaskForm from "../taskForm/TaskForm";
import DeleteForm from "../deleteForm/DeleteForm";
import Notif from '../Notification/Notif';
const initData = JSON.parse(localStorage.getItem("tasksData")) ?? [];
export default function MainBody() {
    const [currentStatus, setCurrentStatus] = useState("All");
    const [formStatus, setFormStatus] = useState(
        {addForm : false,
        editForm : { open : false, Data : {id : -1, title : "", description : ""}},
        DeleteForm : { open : false , id : -1},
        }
      );
    const [Data, setData] = useState(initData);
    const [notif, setNotif] = useState({notif: false, message: "message", type: ""});
    
    
  return (
        <div className="flex w-full font-sour-gummy justify-center items-center h-screen " >
            
            <TaskForm 
            state={{formStatus,Data}} 
            setState={{setFormStatus,setData,setNotif}} />
            <DeleteForm 
            state={{formStatus,Data}} 
            setState={{setFormStatus,setData,setNotif}}/> 
            <Notif state={notif} setState={setNotif} />
            <div className="shadow bg-white lg:w-1/3 md:w-2/3 sm:w-1/2 w-full rounded-md shadow-lg">
                <div className=" mt-4">
                <span className="flex text-5xl justify-center ">TO DO List</span>
                </div>
                <hr className="my-4 border-t-2 border-gray-300" />
                <TasksHead state={currentStatus} setState={setCurrentStatus} />
                <Tasks state={{formStatus,currentStatus,Data}} setState={{setFormStatus,setCurrentStatus,setData}}/>
                <div className="pl-4 pr-3 pb-3 grid-cols-4 flex justify-center items-center">
                <button
                    onClick={() =>
                        setFormStatus((prev) => ({
                        ...prev, 
                        addForm: { add: true, open: true }, 
                        }))
                    }                    
                    type="button"
                    className="py-2 cursor-pointer px-5 me-2 text-md font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-200 hover:text-green-700 focus:ring-0"
                >
                    Add task
                </button>
                </div>
            </div>        
        </div>
  );
}