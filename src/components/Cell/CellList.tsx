import React, { FC, Fragment, useEffect } from "react";
import { useTypedSelector } from "../Hooks/useTypedSelector";
import AddCell from "./AddCell/AddCell";
import CellItem from "./CellItem";
import "./cell-list.css";
import { useActions } from "../Hooks/useActions";

interface Props {}

const CellList: FC<Props> = () => {
  const cells = useTypedSelector(({ cells }) =>
    cells?.order.flatMap((id) => cells.data[id])
  );
  const { fetchCells } = useActions();
  useEffect(() => {
    fetchCells();
  }, []);

  const RendredCells = cells?.map((cell) => (
    <Fragment key={cell.id}>
      <CellItem cell={cell} />
      <AddCell PrevCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div className="cell-list">
      <AddCell forceVisible={cells?.length === 0} PrevCellId={null} />
      {RendredCells}{" "}
    </div>
  );
};

export default CellList;
