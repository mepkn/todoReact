import { TodoFilterProps } from "../types";

export const TodoFilter = ({ filter, setFilter }: TodoFilterProps) => {
  return (
    <div style={{ marginTop: "20px" }}>
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
