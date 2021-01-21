import { type } from "os";

export interface DialogState {
  state  : boolean | null;
  options: {
    anchorOrigin: {
      vertical  : "top" | "middle" | "bottom";
      horizontal: "left" | "center" | "right";
    };
    message: string | React.ReactNode;
    variant: string;
  };
}
export interface MessageState {
  state  : boolean | null;
  options: {
    anchorOrigin: {
      vertical  : "top" | "middle" | "bottom";
      horizontal: "left" | "center" | "right";
    };
    autoHideDuration: number;
    message         : string;
    variant         : string;
  };
}

export interface NavbarState {
  foldedOpen: boolean;
  mobileOpen: boolean;
}

export interface AdminConfigState {
  appName?   : string;
  language?  : string;
  iconURL?   : string;
  appearance?: {
    welcomePage?: {
      image?  : string | null;
      title?  : string;
      message?: string;
    };
    theme?: {
      enableCustom?: boolean;
      main?        : string;
      navbar?      : string;
      toolbar?     : string;
      footer?      : string;
    };
  };
  enableSlack?: boolean;
  teamName?   : string;
  teamAddress?: { postalCode: string; address: string } | null;
  teamStart?  : number;
  fiscalStart?: number;
}

export interface NavigationItem {
  id       : string;
  type     : "group" | "item" | "collapse" | "divider";
  title?   : string;
  icon?    : string;
  url?     : string;
  children?: NavigationItem[];
  exact?   : boolean;
  auth?    : any
}

export type NavigationState = NavigationItem[];
