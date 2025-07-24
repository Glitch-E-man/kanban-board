// column.tsx
import React, { useState } from "react";
import Card from "./card";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface Task {
  title: string;
  assignee: string;
}

interface ColumnProps {
  index: number;
  title: string;
  tasks: Task[];
  color: string;
  onAddTask: (columnIndex: number, newTask: Task) => void;
  onDeleteTask: (columnIndex: number, taskIndex: number) => void;
}

const Column: React.FC<ColumnProps> = ({
  index,
  title,
  tasks,
  color,
  onAddTask,
  onDeleteTask,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAdd = () => {
    if (!newTaskTitle.trim()) return;
    onAddTask(index, { title: newTaskTitle, assignee: "NA" });
    setNewTaskTitle("");
  };

  return (
    <div className={`${color} rounded p-4 w-80`}>
      <h2 className="text-lg font-semibold mb-4 text-black">{title}</h2>

      {/* Add Task UI */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-grow p-2 rounded text-black"
        />
        <button
          onClick={handleAdd}
          className="bg-white text-black px-4 py-2 rounded shadow"
        >
          Add
        </button>
      </div>

      {/* Drag-and-Drop List */}
      <Droppable droppableId={`${index}`}>
        {(dropProvided) => (
          <div
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {tasks.map((task, i) => (
              <Draggable
                key={`${index}-${i}`}
                draggableId={`${index}-${i}`}
                index={i}
              >
                {(dragProvided) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <Card
                      title={task.title}
                      assignee={task.assignee}
                      onDelete={() => onDeleteTask(index, i)}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
