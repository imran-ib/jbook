import { Dispatch } from "redux";
import { CellType } from "../cell";
import { ActionType } from "../Actions/Action-types";
import {
  Action,
  MovecellAction,
  DeletecellAction,
  InsertcellAfterAction,
  UpdatecellAction,
  DirectionType,
  bundleCompleteAction,
  bundleStartAction,
} from "../Actions/index";

import BUNDLE from "../../bundler";

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

export const CreateBundle = (id: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId: id,
      },
    });
    const result = await BUNDLE(input);
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId: id,
        bundle: result,
      },
    });
  };
};
