import React from "react";
import { useActions } from "../../Hooks/useActions";

import "./add-cell.css";

interface Props {
  PrevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<Props> = ({ PrevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(PrevCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>{" "}
          </span>
          <span> code </span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(PrevCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>{" "}
          </span>
          <span> Text </span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
