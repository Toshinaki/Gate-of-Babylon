import { AdminConfigState } from "app/apollo/local/types";
import { makeVar, ReactiveVar } from "@apollo/client";
import _ from "@lodash";
import AdminConfig from "app/app-configs/adminConfig";
import { basicMutations } from "app/apollo/local";

/**
 * Initial values of settings
 */

const initialConfig: AdminConfigState = { ...AdminConfig };
export const adminConfigVar: ReactiveVar<AdminConfigState> = makeVar<AdminConfigState>(
  initialConfig
);

/**
 * Mutations
 */

export const createSetAdminConfig = (
  adminConfigVar: ReactiveVar<AdminConfigState>
) => (value: AdminConfigState) => {
  const curr = adminConfigVar();
  const newConfig = _.merge({}, initialConfig, curr, value);
  adminConfigVar(newConfig);
  // update current default theme
  basicMutations.settings.setDefaultSettings({
    theme: _.pick(newConfig.appearance.theme, [
      "main",
      "navbar",
      "toolbar",
      "footer",
    ]),
  });
};
