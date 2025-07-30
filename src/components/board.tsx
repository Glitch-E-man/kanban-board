// src/components/board.tsx
import React, { useState } from "react";
import Column from "./column";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
} from "react-beautiful-dnd";

interface Task {
  id: string;
  title: string;
  assignee: string;
}

interface ColumnData {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const Board: React.FC = () => {
  const boardColumnIds = [
    "column-0",
    "column-1",
    "column-2",
    "column-3",
    "column-4",
  ];
  const [boardData, setBoardData] = useState<ColumnData[]>(
    boardColumnIds.map((id, index) => ({
      id,
      title: ["To‑do", "In Progress", "Done", "Started", "On Hold"][index],
      color: [
        "bg-red-200",
        "bg-yellow-200",
        "bg-green-200",
        "bg-blue-200",
        "bg-orange-200",
      ][index],
      tasks: [],
    }))
  );

  console.log("Board rendering columns:", boardData.map((c) => c.id));

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "COLUMN") {
      const cols = Array.from(boardData);
      const [moved] = cols.splice(source.index, 1);
      cols.splice(destination.index, 0, moved);
      setBoardData(cols);
      return;
    }

    // Card move logic unchanged…
    const srcIdx = boardData.findIndex((c) => c.id === source.droppableId);
    const dstIdx = boardData.findIndex((c) => c.id === destination.droppableId);
    if (srcIdx < 0 || dstIdx < 0) return;

    const newBoard = Array.from(boardData);
    const sourceTasks = Array.from(newBoard[srcIdx].tasks);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (srcIdx === dstIdx) {
      sourceTasks.splice(destination.index, 0, movedTask);
      newBoard[srcIdx].tasks = sourceTasks;
    } else {
      const destTasks = Array.from(newBoard[dstIdx].tasks);
      destTasks.splice(destination.index, 0, movedTask);
      newBoard[srcIdx].tasks = sourceTasks;
      newBoard[dstIdx].tasks = destTasks;
    }

    setBoardData(newBoard);
  };

  const generateTaskId = () =>
    `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const handleAddTask = (colId: string, taskData: Omit<Task, "id">) => {
    const newTask: Task = { id: generateTaskId(), ...taskData };
    setBoardData((prev) =>
      prev.map((col) =>
        col.id === colId ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );
  };

  const handleDeleteTask = (colId: string, taskId: string) => {
    setBoardData((prev) =>
      prev.map((col) =>
        col.id === colId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      )
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="all-columns"
        direction="horizontal"
        type="COLUMN"
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(prov: DroppableProvided) => (
          <div
            ref={prov.innerRef}
            {...prov.droppableProps}
            className="flex gap-4 p-8 overflow-auto h-screen bg-gray-50 min-h-[200px]"
          >
            {boardData.map((column, idx) => (
              <Draggable
                key={column.id}
                draggableId={column.id}
                index={idx}
              >
                {(dragProv) => (
                  <div
                    ref={dragProv.innerRef}
                    {...dragProv.draggableProps}
                    {...dragProv.dragHandleProps}
                    className="flex-shrink-0"
                  >
                    <Column
                      id={column.id}
                      index={idx}
                      title={column.title}
                      tasks={column.tasks}
                      color={column.color}
                      onAddTask={handleAddTask}
                      onDeleteTask={handleDeleteTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {prov.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;