import { AdminConfigState } from "app/apollo/local/types";

const adminConfig: AdminConfigState = {
  appName: "Brood",
  language: "en",
  iconURL: "/assets/images/logos/brood.svg",
  appearance: {
    welcomePage: {
      image: null,
      title: "Welcome to Brood",
      message: "A business management system.",
    },
    theme: {
      enableCustom: true,
      main: "default",
      navbar: "mainThemeDark",
      toolbar: "mainThemeDark",
      footer: "mainThemeDark",
    },
  },
  enableSlack: false,
  teamName: "Brood",
  teamAddress: null,
  teamStart: 2000,
  fiscalStart: 4,
};

export default adminConfig;
