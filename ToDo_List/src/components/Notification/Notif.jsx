import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdError } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export default function Notif({state, setState}){
    function notifTimeout(){
        setTimeout(() => {
            setState(prev => ({
                    ...prev,
                    notif: false, }
                    ))
        }, 2000);
    }
    return (
      <div
        className={`${
          state.notif ? "" : "hidden"
        } flex absolute left-0 bottom-0 m-3 items-center w-fit max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert`}
      >
        {state.notif ? notifTimeout() : ""}
        <div className="inline-flex items-center justify-center shrink-0 text-2xl  rounded-lg ">
          {state.type === "Delete" ? (
            <MdError className="text-red-500" />
          ) : (
            <IoMdCheckmarkCircleOutline className="text-green-500" />
          )}
        </div>
        <div className=" mx-3 ms-3 text-sm font-normal">{state.message}</div>
        <button
          onClick={() =>
            setState((prev) => ({
              ...prev,
              notif: false,
            }))
          }
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-500 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <IoMdClose />
        </button>
      </div>
    );
}
