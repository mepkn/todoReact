import { TodoSortProps } from "../types";

export const TodoSort = ({ sortOrder, setSortOrder }: TodoSortProps) => {
  return (
    <div>
      <label>
        Sort by Date:
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
};
