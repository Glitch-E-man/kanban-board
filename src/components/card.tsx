import React from "react";

interface CardProps {
  title: string;
  assignee: string;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ title, assignee, onDelete }) => {
  return (
    <div className="bg-white rounded shadow p-4 mb-4 flex items-center justify-between">
      <span className="text-black">{title}</span>
      <div className="flex items-center gap-2">
        <div className="bg-gray-500 text-sm text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {assignee}
        </div>
        <button onClick={onDelete} className="text-red-500 font-bold text-lg">
          ❌
        </button>
      </div>
    </div>
  );
};

export default Card;
