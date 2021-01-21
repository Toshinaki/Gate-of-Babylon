import { makeVar } from "@apollo/client";
import { createMuiTheme } from "@material-ui/core";
import _ from "@lodash";
import LayoutConfigs from "app/app-layouts/layoutConfigs";
import SettingsConfig from "app/app-configs/settingsConfig";
import ThemesConfig from "app/app-configs/themesConfig";
import {
  defaultSettings,
  getParsedQuerySettings,
  defaultThemes,
  defaultThemeOptions,
  mustHaveThemeOptions,
  extendThemeWithMixins,
  mainThemeVariations,
} from "@ff/FFDefaultSettings";

/**
 * Initial values of settings
 */
const initialSettings = getInitialSettings();
const initialThemes = getInitialThemes();

const initialState = {
  initial: initialSettings,
  defaults: _.merge({}, initialSettings),
  current: _.merge({}, initialSettings),
  themes: initialThemes,
  ...getThemeOptions(initialThemes, initialSettings),
};

export const settingsVar = makeVar(initialState);

/**
 *  Mutations
 */
export const createSetSettings = (settingsVar) => (value) => {
  const curr = settingsVar();
  const newSettings = _.merge(
    {},
    curr.current,
    value && value.layout && value.layout.style
      ? {
          layout: {
            config: LayoutConfigs[value.layout.style].defaults,
          },
        }
      : {},
    value
  );
  const themes =
    newSettings.theme.main !== curr.current.theme.main
      ? {
          ...curr.themes,
          ...updateMainThemeVariations(newSettings.theme.main),
        }
      : curr.themes;
  settingsVar({
    ...curr,
    current: newSettings,
    themes,
    ...getThemeOptions(themes, newSettings),
  });
};

export const createSetDefaultSettings = (settingsVar, adminConfigVar) => (
  value
) => {
  const curr = settingsVar();
  const adminConfig = adminConfigVar();
  const newSettings = _.merge(
    {},
    curr.defaults,
    value && value.layout && value.layout.style
      ? {
          layout: {
            config: LayoutConfigs[value.layout.style].defaults,
          },
        }
      : {},
    value,
    adminConfig.appearance.theme.enableCustom
      ? {}
      : { theme: { ...adminConfig.appearance.theme } }
  );
  const themes =
    newSettings.theme.main !== curr.defaults.theme.main
      ? {
          ...curr.themes,
          ...updateMainThemeVariations(newSettings.theme.main),
        }
      : curr.themes;
  settingsVar({
    ...curr,
    defaults: _.merge({}, newSettings),
    current: _.merge({}, newSettings),
    themes,
    ...getThemeOptions(themes, newSettings),
  });
};

export const setInitialSettings = () => {
  settingsVar(initialState);
};

export const createResetDefaultSettings = (settingsVar) => () => {
  const curr = settingsVar();
  const themes = {
    ...curr.themes,
    ...updateMainThemeVariations(curr.defaults.theme.main),
  };
  settingsVar({
    ...curr,
    defaults: _.merge({}, curr.defaults),
    current: _.merge({}, curr.defaults),
    themes,
    ...getThemeOptions(themes, curr.defaults),
  });
};

/**
 *  helper functions
 */
// settings
function getInitialSettings() {
  const defaultLayoutStyle =
    SettingsConfig.layout && SettingsConfig.layout.style
      ? SettingsConfig.layout.style
      : "layout1";
  const layout = {
    style: defaultLayoutStyle,
    config: LayoutConfigs[defaultLayoutStyle].defaults,
  };
  return _.merge(
    {},
    defaultSettings,
    { layout },
    SettingsConfig,
    getParsedQuerySettings()
  );
}

// themes
function getInitialThemes() {
  const themesObj =
    Object.keys(ThemesConfig).length !== 0 ? ThemesConfig : defaultThemes;

  const themes = Object.assign(
    {},
    ...Object.entries(themesObj).map(([key, value]) => {
      const muiTheme = _.merge(
        {},
        defaultThemeOptions,
        value,
        mustHaveThemeOptions
      );
      return {
        [key]: createMuiTheme(
          _.merge({}, muiTheme, { mixins: extendThemeWithMixins(muiTheme) })
        ),
      };
    })
  );

  return {
    ...themes,
    ...mainThemeVariations(themesObj[initialSettings.theme.main]),
  };
}

function updateMainThemeVariations(mainTheme) {
  const themesObj =
    Object.keys(ThemesConfig).length !== 0 ? ThemesConfig : defaultThemes;
  return mainThemeVariations(themesObj[mainTheme]);
}

function getThemeOptions(themes, settings) {
  return {
    mainTheme: themes[settings.theme.main],
    navbarTheme: themes[settings.theme.navbar],
    toolbarTheme: themes[settings.theme.toolbar],
    footerTheme: themes[settings.theme.footer],
    ...updateMainThemeVariations(settings.theme.main),
  };
}