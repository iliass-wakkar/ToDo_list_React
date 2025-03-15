import { MdError } from "react-icons/md";

export default function DeleteForm({ state, setState }) {
  return (
    <>
      <div
        onClick={() =>
          setState.setFormStatus((prev) => ({
            ...prev,
            DeleteForm: { open: false },
          }))
        }
        className={`${
          state.formStatus.DeleteForm.open ? "" : "hidden"
        } absolute flex w-full backdrop-brightness-50  blur-xs h-full`}
      ></div>
      <div
        tabIndex="-1"
        className={`${
          state.formStatus.DeleteForm.open ? "" : "hidden"
        } flex absolute overflow-y-auto overflow-x-hidden z-10 justify-center items-center`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="p-4 md:p-5 text-center">
              <MdError className="mx-auto mb-4 text-gray-400 w-12 h-12" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this task?
              </h3>
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  const newTasks = state.Data.filter(
                    (task) => task.id !== state.formStatus.DeleteForm.id
                  );
                  // Update Data state
                  setState.setData(newTasks);
                  localStorage.setItem("tasksData", JSON.stringify(newTasks));
                  setState.setFormStatus((prev) => ({
                    ...prev,
                    DeleteForm: {
                      open: false,
                    },
                  }));
                  // Display notification
                  setState.setNotif({
                    notif: true,
                    message: "Task Deleted successfully",
                    type: "Delete",
                  });
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() =>
                  setState.setFormStatus((prev) => ({
                    ...prev,
                    DeleteForm: { open: false },
                  }))
                }
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
