import { useState } from "react";
// state
import { useQuery } from "@apollo/client";
import { authQueries } from "app/apollo/queries";
import { appMutations, authMutations } from "app/apollo/mutations";
// functions
import _ from "@lodash";
import { makeStyles } from "@material-ui/core/styles";
// components
import {
  Avatar,
  CircularProgress,
  Icon,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { FadeComponent } from "@ff";
// constants
import LANGUAGES from "app/constants/languages";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: 3,
  },
  avatar: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.primary.contrastText}`,
  },
  buttonProgress: {
    color: theme.palette.secondary.dark,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: "auto",
  },
  successIcon: {
    color: theme.palette.success.main,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: "auto",
    fontSize: 24,
    fontWeight: "bold",
    borderRadius: "50%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const FlagSelect = ({ avatarProps, onSelect, ...props }) => {
  const classes = useStyles();
  const [showSuccessIcon, setShow] = useState(false);

  const {
    data: {
      userState: { profile },
    },
  } = useQuery(authQueries.user.GET_USER_DATA_STATE);
  //   const [updateUserData, { loading }] = useMutation(
  //     authMutations.user.UPDATE_USER_DATA,
  //     {
  //       onCompleted: (data) => {
  //         setShow(true);
  //       },
  //       onError: appMutations.message.handleError,
  //     }
  //   );

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShow(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value) => {
    const newProfile = _.merge({}, _.pick(profile, ["preference"]), {
      preference: { language: value },
    });
    // updateUserData({ variables: { profile: newProfile } });
    authMutations.user.updateUserProfile(newProfile);
    handleClose();
  };

  const currLang = _.find(LANGUAGES, { value: profile.preference.language });
  return (
    <div className="px-4 relative">
      <IconButton
        aria-controls="select-language"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
        {...props}
      >
        {!!currLang ? (
          <Avatar
            src={currLang.flag}
            alt={currLang.label}
            className={classes.avatar}
            {...avatarProps}
          />
        ) : (
          <Icon>language</Icon>
        )}
      </IconButton>

      {/* {loading && (
        <CircularProgress
          size={16}
          thickness={8}
          className={classes.buttonProgress}
        />
      )} */}
      {showSuccessIcon && (
        <FadeComponent>
          <Icon className={classes.successIcon}>check</Icon>
        </FadeComponent>
      )}

      <Menu
        id="select-language"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem
            selected={lang.value === currLang.value}
            disabled={lang.value === currLang.value}
            onClick={() => {
              !!onSelect && onSelect(lang.value);
              handleSelect(lang.value);
            }}
            key={lang.value}
          >
            <Avatar
              src={lang.flag}
              alt={lang.label}
              className={classes.avatar}
            />
            <span className="pl-4">{lang.label}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default FlagSelect;
