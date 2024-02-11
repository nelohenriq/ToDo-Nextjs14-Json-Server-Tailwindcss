import type { Task } from "@/types/tasks";
import { TaskDetails } from "./Task";
import { FiEdit } from "react-icons/fi";

type TaskProps = {
  tasks: Task[];
};

const TodoList: React.FC<TaskProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {tasks.map((task) => (
            <TaskDetails key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TodoList;
