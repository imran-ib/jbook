import { ActionType } from "./Action-types";
import { CellType } from "../cell";

export type DirectionType = "Up" | "Down";

export interface MovecellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: DirectionType;
  };
}
export interface DeletecellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}
export interface InsertcellbeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: CellType;
  };
}
export interface UpdatecellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export type Action =
  | MovecellAction
  | DeletecellAction
  | InsertcellbeforeAction
  | UpdatecellAction;
