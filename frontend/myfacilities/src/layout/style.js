import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    shiftTopbar: {
        paddingTop: 56,
    },
    content: {
        flexGrow: 1,
        paddingTop: 56,
        height: '100%',
    },
    shiftContent: {
        paddingLeft: 250,
    }
}));

export default useStyles;