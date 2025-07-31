import React, { useState } from "react";
import Card from "./card";
import {
  Droppable,
  Draggable,
  DroppableProvided,
} from "react-beautiful-dnd";

interface Task {
  id: string;
  title: string;
  assignee: string;
}

interface ColumnProps {
  id: string;
  index: number;
  title: string;
  tasks: Task[];
  color: string;
  onAddTask: (colId: string, taskData: Omit<Task, "id">) => void;
  onDeleteTask: (colId: string, taskId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  id,
  title,
  tasks,
  color,
  onAddTask,
  onDeleteTask,
}) => {
  const [input, setInput] = useState("");

    const addTask = () => {
    if (!input.trim()) return;
    onAddTask(id, { title: input.trim(), assignee: "NA" });
    setInput("");
  };

  return (
    <div className={`${color} rounded p-4 w-80 flex flex-col`}
    >
      <div className="flex items-center justify-between mb-4 cursor-grab">
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <span>≡</span>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-grow p-2 rounded text-black"
          placeholder="New task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask} className="bg-white text-black px-4 py-2 rounded shadow">
          Add
        </button>
      </div>

      <Droppable
        droppableId={id}
        type="TASK"
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(prov: DroppableProvided) => (
          <div
            ref={prov.innerRef}
            {...prov.droppableProps}
            className="flex-grow min-h-[100px] bg-gray-100/20 rounded shadow"
          >
            {tasks.map((task, idx) => (
              <Draggable key={task.id} draggableId={task.id} index={idx}>
                {(dragProv) => (
                  <div
                    ref={dragProv.innerRef}
                    {...dragProv.draggableProps}
                    {...dragProv.dragHandleProps}
                  >
                    <Card
                      id={task.id}
                      title={task.title}
                      assignee={task.assignee}
                      onDelete={() => onDeleteTask(id, task.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {prov.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;