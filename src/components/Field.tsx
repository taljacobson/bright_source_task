import { withStyles, Theme, createStyles, alpha, InputBase, FormControl, InputLabel, makeStyles } from "@material-ui/core";

export const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
                
            },
        },
        input: {
            marginBottom: theme.spacing(2),
            borderRadius: 4,
            position: 'relative',
            backgroundColor: '#fff5e2;',
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
        },
    }),
)(InputBase);

const useStyles = makeStyles((theme) => ({
    label: {
        textTransform: 'uppercase',
    },
}));

interface Props {
    id: string, 
    value: string, 
    label?: string, 
    readOnly?: boolean
}

export const Field: React.FC<Props> = ({ label, id, value, readOnly= true }) => {
    const classes = useStyles();
    return (
        <FormControl fullWidth >
            {label && <InputLabel className={classes.label} htmlFor={id}>
                {label}
            </InputLabel>}
            <BootstrapInput readOnly={readOnly} fullWidth id={id} defaultValue={value} />
        </FormControl>
    )
}

export default Field;