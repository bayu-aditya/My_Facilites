import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
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