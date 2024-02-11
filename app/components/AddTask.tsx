"use client";
import { GoPlus } from "react-icons/go";
import Modal from "./Modal";
import React from "react";
import { addTask } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [newTaskValue, setNewTaskValue] = React.useState<string>("");
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleSubmitTodo: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    await addTask({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };
  return (
    <div className="w-full flex items-center">
      <button
        className="btn btn-primary w-full"
        onClick={() => setModalOpen(true)}
      >
        Add new task
        <GoPlus size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitTodo}>
          <h3>Add new task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => {
                console.log("Entered value:", e.target.value);
                setNewTaskValue(e.target.value);
              }}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter task"
              required
            />
            <button type="submit" className="btn">
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
