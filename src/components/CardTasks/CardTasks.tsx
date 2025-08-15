"use client";

import React from "react";

interface CardTasksProps {
  opened: string;
  taskTitle: string;
}

const CardTasks: React.FC<CardTasksProps> = ({ opened, taskTitle }) => {
  return (
    <div>
      {/* Card yang membuka modal */}
      <label
        htmlFor={`modal_${taskTitle}`} // unik per task
        className="flex cursor-pointer flex-col items-start rounded-xl border border-slate-400 bg-[#dbfcf2] p-4 pb-20"
      >
        <p className="text-sm text-slate-600">{opened}</p>
        <h1 className="font-semibold text-[#23a969]">{taskTitle}</h1>
      </label>

      {/* Modal */}
      <input
        type="checkbox"
        id={`modal_${taskTitle}`}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box rounded-xl border border-slate-400">
          <h3 className="text-lg font-bold">{taskTitle}</h3>
          <p className="py-4">Editable Fields</p>

          <p>Instruction</p>
          <textarea className="textarea" placeholder="Instruksi"></textarea>

          <p>Knowledge</p>
          <input type="file" className="file-input" />

          <div className="flex justify-end mt-4">
            <button className="btn rounded-full bg-black text-white">
              Run
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={`modal_${taskTitle}`}>
          Close
        </label>
      </div>
    </div>
  );
};

export default CardTasks;
