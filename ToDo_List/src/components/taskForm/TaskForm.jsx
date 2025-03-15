import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { HiCheck } from "react-icons/hi";

export default function TaskForm({ state, setState }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Initialize form data when entering edit mode
  useEffect(() => {
    if (state.formStatus.editForm.open && state.formStatus.editForm.Data) {
      setFormData({
        title: state.formStatus.editForm.Data.title,
        description: state.formStatus.editForm.Data.description,
      });
    } else {
      // Reset form data when not in edit mode
      setFormData({
        title: "",
        description: "",
      });
    }
  }, [state.formStatus.editForm]);

  function addTask() {
    const newTask = {
      id: uuid(),
      title: formData.title,
      description: formData.description,
      state: "In progress",
    };
    const tasks = [...state.Data, newTask];
    setState.setData(tasks);
    localStorage.setItem("tasksData", JSON.stringify(tasks));
    // Reset form status
    setState.setFormStatus((prev) => ({
      ...prev,
      addForm: false,
    }));

    // Reset form fields
    setFormData({
      title: "",
      description: "",
    });

    // Display notification
    setState.setNotif({
      notif: true,
      message: "Task added successfully",
      type: "success",
    });
  }

  function editTask() {
    // Find the index of the task to edit
    const index = state.Data.findIndex(
      (task) => task.id === state.formStatus.editForm.Data.id
    );

    if (index === -1) {
      console.error("Task not found");
      return;
    }

    // Update the task in the array immutably
const tasks = state.Data.map((task, i) =>
        i === index
          ? {
              ...task,
              title: formData.title,
              description: formData.description,
            }
          : task
      );
setState.setData(tasks);
localStorage.setItem("tasksData", JSON.stringify(tasks));

    // Reset form status
    setState.setFormStatus((prev) => ({
      ...prev,
      editForm: {
        ...prev.editForm,
        open: false,
      }, // Reset the edit form
    }));

    // Display notification
    setState.setNotif({
      notif: true,
      message: "Task edited successfully",
      type: "success",
    });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => {
          setState.setFormStatus((prev) => ({
            ...prev,
            addForm: false,
            editForm: {
              ...prev.editForm,
              open: false,
            },
          }));
        }}
        className={`${
          state.formStatus.addForm || state.formStatus.editForm.open
            ? ""
            : "hidden"
        } absolute flex w-full backdrop-brightness-50 blur-xs h-full`}
      ></div>

      {/* Form */}
      <div
        className={`${
          state.formStatus.addForm || state.formStatus.editForm.open
            ? ""
            : "hidden"
        } text-md rounded-sm absolute z-10 flex flex-col justify-center items-center mt-5 p-4 bg-white lg:w-1/3 md:w-2/3 sm:w-1/2 w-full`}
      >
        <form className="w-3/4 my-2 flex flex-col justify-center items-center">
          {/* Title Input */}
          <div className="mb-5 w-full">
            <label
              htmlFor="Title"
              className="block mb-2 font-medium text-black"
            >
              Title
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              type="text"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-gray-700 focus:border-gray-800 block w-full p-2.5"
              value={formData.title}
              required
            />
          </div>

          {/* Description Textarea */}
          <div className="mb-5 w-full">
            <label htmlFor="description" className="block mb-2 font-medium">
              Your description
            </label>
            <textarea
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="4"
              className="block p-2.5 w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-700 focus:border-gray-800"
              placeholder="Enter description..."
              value={formData.description}
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              if (state.formStatus.addForm.open) {
                addTask();
              } else {
                editTask();
              }
            }}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
