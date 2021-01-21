/**
 * Manage state of alert snackbars
 */
import { makeVar, ReactiveVar } from "@apollo/client";
import { MessageState } from "app/apollo/local/types";

const initialState: MessageState = {
  state: null,
  options: {
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    autoHideDuration: 3000,
    message: "Hi",
    variant: null,
  },
};

export const messageVar: ReactiveVar<MessageState> = makeVar<MessageState>(
  initialState
);

export const createHideMessage = (
  messageVar: ReactiveVar<MessageState>
) => () => {
  const messageState = messageVar();
  messageVar({
    ...messageState,
    state: null,
  });
};

export const showMessage = (options: MessageState["options"]) => {
  messageVar({
    state: true,
    options: {
      ...initialState.options,
      ...options,
    },
  });
};

export const showError = (message: string) => {
  messageVar({
    state: true,
    options: {
      ...initialState.options,
      variant: "error",
      message: message,
      autoHideDuration: 60000,
    },
  });
};

export const handleError = (error: {
  code?: any;
  name?: any;
  message?: any;
}) => {
  console.log(error);
  messageVar({
    state: true,
    options: {
      ...initialState.options,
      variant: "error",
      message: `Error: ${error.code || ""} ${error.name || ""}\n  ${
        error.message || "Something happened... Please try again later"
      }`,
      autoHideDuration: 60000,
    },
  });
};
