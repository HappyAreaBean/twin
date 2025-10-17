import { Button, Paper, Typography } from "@material-ui/core";
import { createTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import ClipboardText from "mdi-material-ui/ClipboardText";
import { useSnackbar } from "notistack";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: "20px",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-end",
    paddingTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
}));

const continueButton = createTheme({
  palette: {
    primary: green,
  },
});

const SavedDialog = ({ configId }) => {
  const classes = useStyles();
  const { replace } = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const redirectToHomePage = () => replace("/");
  const showCopySnackbar = () => enqueueSnackbar("Copied to clipboard!", { variant: "info" });

  async function ContinueEditing() {
    try {
      const response = await axios.get(`/api/v1/continue/${configId}`);
      replace(`/${response.data.id}`, { configId: response.data.id });
    } catch (ex) {
      replace({
        pathname: "/",
        state: { error: true },
      });
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Button
          variant="outlined"
          color="primary"
          onClick={redirectToHomePage}
          className={classes.button}
          startIcon={<HomeIcon />}>
          Back Home
        </Button>
        <Typography variant="h5" className={classes.title}>
          Config saved
        </Typography>
        <Typography variant="body1">
          You can deploy it on your server by executing the following command:
        </Typography>
        <Typography variant="subtitle1" color="secondary">
          <code>/twin {configId}</code>
        </Typography>
        <CopyToClipboard text={`/twin ${configId}`}>
          <Button
            variant="outlined"
            color="primary"
            onClick={showCopySnackbar}
            className={classes.button}
            startIcon={<ClipboardText />}>
            Copy to Clipboard
          </Button>
        </CopyToClipboard>
        <ThemeProvider theme={continueButton}>
          <Button
            variant="outlined"
            color="primary"
            onClick={ContinueEditing}
            className={classes.button}
            startIcon={<AddIcon />}>
            Continue Editing
          </Button>
        </ThemeProvider>
      </Paper>
    </div>
  );
};

export default SavedDialog;
