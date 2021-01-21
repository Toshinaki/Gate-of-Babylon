import _ from "@lodash";
import * as dialog from "./dialog";
import * as message from "./message";
import * as navbar from "./navbar";
import * as navigation from "./navigation";
import * as settings from "./settings";
import * as adminConfig from "./init";

const basicMutations = {
  dialog: {
    ..._.omitBy(dialog, (v, k) => _.startsWith(k, "create")),
    closeDialog: dialog.createCloseDialog(dialog.dialogVar),
  },
  message: {
    ..._.omitBy(message, (v, k) => _.startsWith(k, "create")),
    hideMessage: message.createHideMessage(message.messageVar),
  },
  navbar: {
    ..._.omitBy(navbar, (v, k) => _.startsWith(k, "create")),
    navbarToggleFolded: navbar.createNavbarToggleFolded(navbar.navbarVar),
    navbarOpenFolded  : navbar.createNavbarOpenFolded(navbar.navbarVar),
    navbarCloseFolded : navbar.createNavbarCloseFolded(navbar.navbarVar),
    navbarToggleMobile: navbar.createNavbarToggleMobile(navbar.navbarVar),
    navbarOpenMobile  : navbar.createNavbarOpenMobile(navbar.navbarVar),
    navbarCloseMobile : navbar.createNavbarCloseMobile(navbar.navbarVar),
  },
  navigation: {
    ..._.omitBy(navigation, (v, k) => _.startsWith(k, "create")),
    addAuthToNavigation  : navigation.createAddAuthToNavigation(navigation.navigationVar),
    appendNavigationItem : navigation.createAppendNavigationItem(navigation.navigationVar),
    prependNavigationItem: navigation.createPrependNavigationItem(navigation.navigationVar),
    updateNavigationItem : navigation.createUpdateNavigationItem(navigation.navigationVar),
    removeNavigationItem : navigation.createRemoveNavigationItem(navigation.navigationVar),
  },
  settings: {
    ..._.omitBy(settings, (v, k) => _.startsWith(k, "create")),
    setSettings         : settings.createSetSettings(settings.settingsVar),
    setDefaultSettings  : settings.createSetDefaultSettings(settings.settingsVar, adminConfig.adminConfigVar),
    resetDefaultSettings: settings.createResetDefaultSettings(settings.settingsVar),
  },
  adminConfig: {
    ..._.omitBy(adminConfig, (v, k) => _.startsWith(k, "create")),
    setAdminConfig: adminConfig.createSetAdminConfig(adminConfig.adminConfigVar),
  },
};

export default basicMutations;

export const typePolicyFields = {
  dialog: {
    read() {
      return dialog.dialogVar();
    },
  },
  message: {
    read() {
      return message.messageVar();
    },
  },
  navbar: {
    read() {
      return navbar.navbarVar();
    },
  },
  navigation: {
    read() {
      return navigation.navigationVar();
    },
  },
  settings: {
    read() {
      return settings.settingsVar();
    },
  },
  adminConfig: {
    read() {
      return adminConfig.adminConfigVar();
    },
  },
};
