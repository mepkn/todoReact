import { useTodoContext } from "../hooks/useTodoContext";

export const TodoFilter = () => {
  const { filter, setFilter } = useTodoContext();

  return (
    <div>
      <label>
        Filter:
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "completed" | "incomplete")
          }
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </label>
    </div>
  );
};
