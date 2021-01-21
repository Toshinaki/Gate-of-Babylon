import { NavigationItem, NavigationState } from "app/apollo/local/types";
import { makeVar, ReactiveVar } from "@apollo/client";
import _ from "@lodash";
import { FFUtils } from "@ff";
import navigationConfig from "app/app-configs/navigationConfig";

/**
 * Initial values of navigation
 */
const initialState: NavigationState = navigationConfig;

export const navigationVar: ReactiveVar<NavigationState> = makeVar<NavigationState>(
  initialState
);

/**
 *  Mutations
 */
// export const createGetNavigation = (navigationVar: ReactiveVar<NavigationState>) => () => {
//   return navigationVar();
// };

export const createAddAuthToNavigation = (
  navigationVar: ReactiveVar<NavigationState>
) => (routeAuth) => {
  const navigation = navigationVar();
  const newNavigation = addAuthToNavigation(navigation, routeAuth);
  return navigationVar(newNavigation);
};

export const setNavigation = (navigation: NavigationState) => {
  return navigationVar([...navigation]);
};

export const resetNavigation = () => {
  return navigationVar(initialState);
};

export const createAppendNavigationItem = (
  navigationVar: ReactiveVar<NavigationState>
) => (item, parentId: NavigationItem["id"]) => {
  const navigation = navigationVar();
  navigationVar(FFUtils.appendNavItem(navigation, item, parentId));
};

export const createPrependNavigationItem = (
  navigationVar: ReactiveVar<NavigationState>
) => (item, parentId: NavigationItem["id"]) => {
  const navigation = navigationVar();
  navigationVar(FFUtils.prependNavItem(navigation, item, parentId));
};

export const createUpdateNavigationItem = (
  navigationVar: ReactiveVar<NavigationState>
) => (id: NavigationItem["id"], item) => {
  const navigation = navigationVar();
  navigationVar(FFUtils.updateNavItem(navigation, id, item));
};

export const createRemoveNavigationItem = (
  navigationVar: ReactiveVar<NavigationState>
) => (id: NavigationItem["id"]) => {
  const navigation = navigationVar();
  navigationVar(FFUtils.removeNavItem(navigation, id));
};

const addAuthToNavigation = (navigation: NavigationState, routeAuth) => {
  return _.cloneDeep(navigation).map((nav: NavigationItem) => {
    if (!!nav.children && nav.children.length > 0) {
      nav.children = addAuthToNavigation(nav.children, routeAuth);
    }
    if (nav.url) {
      const route = _.find(routeAuth, { path: nav.url });
      nav.auth = !!route ? route.auth : null;
    }
    return nav;
  });
};
