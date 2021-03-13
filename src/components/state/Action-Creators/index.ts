import { CellType } from "../cell";
import { ActionType } from "../Actions/Action-types";
import {
  Action,
  MovecellAction,
  DeletecellAction,
  InsertcellAfterAction,
  UpdatecellAction,
  DirectionType,
} from "../Actions/index";

export const moveCell = (
  id: string,
  direction: DirectionType
): MovecellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const deleteCell = (payload: string): DeletecellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload,
  };
};
export const insertCellAfter = (
  id: string | null,
  type: CellType
): InsertcellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,

    payload: {
      id,
      type,
    },
  };
};

export const updateCell = (id: string, content: string): UpdatecellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
