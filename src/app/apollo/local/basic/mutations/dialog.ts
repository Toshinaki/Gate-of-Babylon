/**
 * Manage state of dialog that displays simple messages
 */
import { makeVar, ReactiveVar } from "@apollo/client";
import { DialogState } from "app/apollo/local/types";

const initialState: DialogState = {
  state: null,
  options: {
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    message: "Hi",
    variant: null,
  },
};

export const dialogVar: ReactiveVar<DialogState> = makeVar<DialogState>(
  initialState
);

export const openDialog = (options: DialogState["options"]) => {
  dialogVar({
    state: true,
    options: {
      ...initialState.options,
      ...options,
    },
  });
};

export const createCloseDialog = (
  dialogVar: ReactiveVar<DialogState>
) => () => {
  const dialogState = dialogVar();
  dialogVar({ ...dialogState, state: false });
};
