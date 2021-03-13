import React from "react";
import CodeCell from "../code-cell/code-cell";
import { Cell } from "../state/cell";
import TextEditor from "../TextEditor/TextEditor";
import ActionBar from "./ActionBar";
import "./action-bar.css";
import "./cell-item.css";

interface Props {
  cell: Cell;
}

const CellItem: React.FC<Props> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
      </>
    );
  }
  return <div className="cell-list-item">{child}</div>;
};

export default CellItem;
