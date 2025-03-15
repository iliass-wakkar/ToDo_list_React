import { MdEdit,MdDelete } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Tasks({ state, setState }) {

  const filtredData = state.currentStatus != 'All' ? state.Data.filter((task) => task.state == state.currentStatus) : state.Data;
 
    return(
        <>
            {filtredData.map((task,index) => {return (
              <div key={index} className="flex flex-col text-lg ">
                <div className="hover:bg-gray-200 rounded-md py-2 mx-1">
                  <div className="pl-4 pr-3 pb-3 w-full flex  items-center">
                    <div className="flex left-0 w-full">{task.title}</div>
                    <div
                      onClick={() => {
                        
                        const tasks = state.Data.map((item) =>
                          item.id === task.id
                            ? {
                                ...item,
                                state:
                                  item.state === "Completed"
                                    ? "In progress"
                                    : "Completed",
                              }
                            : item
                        );
                        setState.setData(tasks);
                        localStorage.setItem(
                          "tasksData",
                          JSON.stringify(tasks)
                        );
                      }
                      }
                      className={`${
                        task.state == "Completed"
                          ? "text-green-500 shadow-[inset_0_0_0_2px_#00c950] hover:bg-white hover:text-green-500"
                          : "hover:text-green-500 hover:bg-white"
                      } relative  cursor-pointer mh-3 p-2 rounded-full flex justify-center items-center`}
                    >
                      <IoCheckmarkDone />
                    </div>
                    <div
                      onClick={() =>
                        setState.setFormStatus((prev) => ({
                          ...prev,
                          DeleteForm: { delete: true, open: true, id: task.id },
                        }))
                      }
                      className="hover:text-red-700 Delete cursor-pointer mh-3 hover:bg-white p-2 rounded-full flex justify-center items-center"
                    >
                      <MdDelete className="" />
                    </div>
                    <div
                      onClick={() =>
                        setState.setFormStatus((prev) => ({
                          ...prev,
                          editForm: {
                            open: true,
                            Data: {
                              id: task.id,
                              title: task.title,
                              description: task.description,
                            },
                          },
                        }))
                      }
                      className=" hover:text-blue-500 Edite cursor-pointer mh-3 hover:bg-white p-2 rounded-full flex justify-center items-center"
                    >
                      <MdEdit />
                    </div>
                  </div>
                  <div className="ml-6 flex left-0 ">{task.description}</div>
                </div>
                <hr className="my-2 border-t-2 border-gray-300" />
              </div>
            );} )}
        </>
    )
}