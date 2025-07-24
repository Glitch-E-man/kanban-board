
import React, { useState } from "react";
import Column from "./column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";


interface Task {
  title: string;
  assignee: string;
}

interface ColumnData {
  title: string;
  color: string;
  tasks: Task[];
}

const Board: React.FC = () => {
  const [boardData, setBoardData] = useState<ColumnData[]>([
    {
      title: "To-do",
      color: "bg-red-200",
      tasks: [
        
      ],
    },
    {
      title: "In Progress",
      color: "bg-yellow-200",
      tasks: [
        
      ],
    },
    {
      title: "Done",
      color: "bg-green-200",
      tasks: [
        
      ],
    },
  ]);

  const handleDragEnd = (result: DropResult) => {

    console.log(
    "Drag ended – source:",
    result.source.droppableId,
    "→ dest:",
    result.destination?.droppableId
  );

  const { source, destination } = result;
  if (!destination) return;

    const sourceColIdx = parseInt(source.droppableId);
    const destColIdx = parseInt(destination.droppableId);

    const sourceCol = boardData[sourceColIdx];
    const destCol = boardData[destColIdx];

    const sourceTasks = [...sourceCol.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColIdx === destColIdx) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const updatedColumn = { ...sourceCol, tasks: sourceTasks };
      const newBoard = [...boardData];
      newBoard[sourceColIdx] = updatedColumn;
      setBoardData(newBoard);
    } else {
      const destTasks = [...destCol.tasks];
      destTasks.splice(destination.index, 0, movedTask);

      const newBoard = [...boardData];
      newBoard[sourceColIdx] = { ...sourceCol, tasks: sourceTasks };
      newBoard[destColIdx] = { ...destCol, tasks: destTasks };
      setBoardData(newBoard);
    }
  };

  const handleAddTask = (colIdx: number, newTask: Task) => {
    const newBoard = [...boardData];
    newBoard[colIdx].tasks.push(newTask);
    setBoardData(newBoard);
  };

  const handleDeleteTask = (colIdx: number, taskIdx: number) => {
    const newBoard = [...boardData];
    newBoard[colIdx].tasks.splice(taskIdx, 1);
    setBoardData(newBoard);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-8 overflow-auto h-screen bg-gray-800">
        {boardData.map((col, idx) => (
          <Column
            key={idx}
            index={idx}
            title={col.title}
            tasks={col.tasks}
            color={col.color}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
