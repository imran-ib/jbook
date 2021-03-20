import { RootState } from "./../Reducers/index";
import axios from "axios";
import { Dispatch } from "redux";
import { Cell, CellType } from "../cell";
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

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_CELLS,
    });
    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells } = getState();
    const data = cells?.data;
    const order = cells?.order;
    //@ts-ignore
    const Cells = order?.map((id) => data[id]);
    try {
      await axios.post("/cells", { Cells });
    } catch (error) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};
