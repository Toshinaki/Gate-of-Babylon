import { NavigationState } from "app/apollo/local/types";
import * as urls from "app/constants/frontRoutes";

const navigationConfig: NavigationState = [
  {
    id: "tool",
    title: "Tools",
    type: "group",
    children: [
      {
        id: "start",
        title: "Start",
        type: "item",
        icon: "dashboard",
        url: urls.Start,
      },
      {
        id: "colors",
        title: "Color Picker",
        type: "item",
        icon: "assignment",
        url: urls.ColorPicker,
      },
      {
        id: "j2c",
        title: "Json 2 Csv",
        type: "item",
        icon: "work_outline",
        url: urls.J2C,
      },
    ],
  },
  {
    type: "divider",
    id: "divider-1",
  },
  {
    id: "brood",
    title: "Brood",
    type: "group",
    children: [
      // {
      //   id: "settings",
      //   title: "Settings",
      //   type: "item",
      //   icon: "settings",
      //   url: urls.Settings,
      //   exact: true,
      // },
      {
        id: "app_settings",
        title: "App Settings",
        type: "item",
        icon: "settings_applications",
        url: urls.AppSettings,
        exact: true,
      },
      {
        id: "help",
        title: "Help",
        type: "collapse",
        icon: "help",
        children: [
          {
            id: "q_and_a",
            title: "Q&A",
            type: "item",
            url: urls.QA,
          },
          {
            id: "document",
            title: "Document",
            type: "item",
            url: urls.Document,
          },
        ],
      },
      // {
      //   id: "notification",
      //   title: "Notification",
      //   type: "item",
      //   url: urls.Notification,
      //   icon: "notifications_active",
      // },
      // {
      //   id: "signout",
      //   title: "Sign out",
      //   type: "item",
      //   url: urls.Signout,
      //   icon: "power_settings_new",
      // },
    ],
  },
];

export default navigationConfig;
