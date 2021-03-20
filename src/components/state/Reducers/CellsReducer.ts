import produce from "immer";
import { ActionType } from "../Actions/Action-types";
import { Action } from "../Actions";
import { Cell } from "../cell";
import { stat } from "fs";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return state;
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      return state;
    case ActionType.FETCH_CELLS_COMPLETE:
      state.order = action.payload.map((cee) => cell.id);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState["data"]);
      return state;
    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;

    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);

      return state;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: "",
        id: RandomId(),
        type: action.payload.type,
      };
      state.data[cell.id] = cell;
      const index = state.order.findIndex((id) => id === action.payload.id);
      if (index < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }

      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const CurrentIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );
      const TargetIndex =
        direction === "Up" ? CurrentIndex - 1 : CurrentIndex + 1;
      if (TargetIndex < 0 || TargetIndex > state.order.length - 1) {
        return;
      }
      state.order[CurrentIndex] = state.order[TargetIndex];
      state.order[TargetIndex] = action.payload.id;
      return state;

    default:
      return state;
  }
});

const RandomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
