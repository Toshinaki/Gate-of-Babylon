import { Typography, Link as MuiLink } from "@material-ui/core";

export default function Copyright() {
  return (
    <Typography variant="body2" align="center" className="w-full">
      CopyRight ©
      <MuiLink
        color="inherit"
        href="https://toshinaki.github.io"
        rel="noreferrer noopener nofollow"
        target="_blank"
      >
        Toshinaki
      </MuiLink>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
}
