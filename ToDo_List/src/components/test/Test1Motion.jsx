import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ClickableDiv() {
  function TaskStatusToggle({ task, setState }) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
      // Update task state
      setState.setData((prev) =>
        prev.map((item) =>
          item.id === task.id
            ? {
                ...item,
                state: item.state === "Completed" ? "In progress" : "Completed",
              }
            : item
        )
      );

      // Trigger animation
      setIsAnimating(true);
    };

    return (
      <div
        onClick={handleClick}
        className={`${
          task.state === "Completed" ? "text-green-500 border border-2" : ""
        } cursor-pointer m-3 p-2 rounded-full flex justify-center items-center relative overflow-hidden`}
      >
        {/* Animation Overlay */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="absolute inset-0 bg-green-500 rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onAnimationComplete={() => setIsAnimating(false)}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <IoCheckmarkDone
          className={`${
            task.state === "Completed" ? "text-green-500" : "text-gray-400"
          }`}
        />
      </div>
    );
  }
}
