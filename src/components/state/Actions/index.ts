import { ActionType } from "./Action-types";
import { Cell, CellType } from "../cell";

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
export interface InsertcellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
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

export interface bundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}
export interface bundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export interface fetchCellsAction {
  type: ActionType.FETCH_CELLS;
}
export interface fetchCellsCompleteAction {
  type: ActionType.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}
export interface fetchCellsErrorAction {
  type: ActionType.FETCH_CELLS_ERROR;
  payload: string;
}
export interface saveCellErrorAction {
  type: ActionType.SAVE_CELLS_ERROR;
  payload: string;
}

export type Action =
  | MovecellAction
  | DeletecellAction
  | InsertcellAfterAction
  | UpdatecellAction
  | bundleStartAction
  | bundleCompleteAction
  | fetchCellsAction
  | fetchCellsCompleteAction
  | fetchCellsErrorAction
  | saveCellErrorAction;
