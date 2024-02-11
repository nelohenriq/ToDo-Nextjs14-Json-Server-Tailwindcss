"use client";
import { Task } from "@/types/tasks";
import { FiEdit, FiTrash } from "react-icons/fi";
import Modal from "./Modal";
import React from "react";
import { deleteTask, updateTask } from "@/api";
import { useRouter } from "next/navigation";

type TaskProps = {
  task: Task;
};

export const TaskDetails: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [updatedTaskValue, setUpdatedTaskValue] = React.useState<string>(
    task.text,
  );
  const [modalOpenEdit, setModalOpenEdit] = React.useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = React.useState<boolean>(false);
  const handleSubmitEditTodo: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    await updateTask({
      id: task.id,
      text: updatedTaskValue,
    });
    setModalOpenEdit(false);
    router.refresh();
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTask(id);
    setModalOpenDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td>{task.text}</td>
      <td className="flex gap-2">
        <FiEdit
          className="cursor-pointer"
          color="blue"
          onClick={() => setModalOpenEdit(true)}
        />
        <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3>Edit Task</h3>
            <div className="modal-action">
              <input
                value={updatedTaskValue}
                onChange={(e) => {
                  console.log("Entered value:", e.target.value);
                  setUpdatedTaskValue(e.target.value);
                }}
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter task"
                required
              />
              <button type="submit" className="btn">
                Update
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash
          className="cursor-pointer"
          color="red"
          onClick={() => setModalOpenDelete(true)}
        />
        <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteTodo(task.id)}
              className="btn btn-secondary-custom"
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};
