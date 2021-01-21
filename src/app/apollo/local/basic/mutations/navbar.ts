import { makeVar, ReactiveVar } from "@apollo/client";
import { NavbarState } from "app/apollo/local/types";

const initialState: NavbarState = {
  foldedOpen: false,
  mobileOpen: false,
};

export const navbarVar: ReactiveVar<NavbarState> = makeVar<NavbarState>(
  initialState
);

export const createNavbarToggleFolded = (
  navbarVar: ReactiveVar<NavbarState>
) => () => {
  const navbarState = navbarVar();
  navbarVar({ ...navbarState, foldedOpen: !navbarState.foldedOpen });
};

export const createNavbarOpenFolded = (
  navbarVar: ReactiveVar<NavbarState>
) => () => {
  const navbarState = navbarVar();
  navbarVar({ ...navbarState, foldedOpen: true });
};

export const createNavbarCloseFolded = (
  navbarVar: ReactiveVar<NavbarState>
) => () => {
  const navbarState = navbarVar();
  navbarVar({ ...navbarState, foldedOpen: false });
};

export const createNavbarToggleMobile = (
  navbarVar: ReactiveVar<NavbarState>
) => () => {
  const navbarState = navbarVar();
  navbarVar({ ...navbarState, mobileOpen: !navbarState.mobileOpen });
};

export const createNavbarOpenMobile = (
  navbarVar: ReactiveVar<NavbarState>
) => () => {
  const navbarState = navbarVar();
  navbarVar({ ...navbarState, mobileOpen: true });
};

export const createNavbarCloseMobile = (
  navbarVar: ReactiveVar<NavbarState>
) => () => {
  const navbarState = navbarVar();
  navbarVar({ ...navbarState, mobileOpen: false });
};
