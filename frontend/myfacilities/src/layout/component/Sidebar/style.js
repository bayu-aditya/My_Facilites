import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  drawer: {
    flexShrink: 0,
  },
  shiftList: {
      paddingTop: 60,
  },
  list: {
      width: 250,
  },
  profile: {
      textAlign: "center",
      margin: '5px',
  },
  avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      left: theme.spacing(10),
      marginBottom: '10px',
  },
}));

export default useStyles;