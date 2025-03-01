import { Outlet } from "react-router-dom";

export const Container = () => {
  return (
    <div
      className="container"
      style={{ paddingBlock: "20px", maxWidth: "600px" }}
    >
      <Outlet />
    </div>
  );
};
