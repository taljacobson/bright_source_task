import { makeStyles, Container, AppBar, Toolbar, Paper, Grid, Typography, Tooltip } from "@material-ui/core";

import { ActionsHash, ResourceItem } from "../utils";
import { ReactComponent as Help } from '../assets/icons/help-12.svg'
import Field from "./Field";

const useStyles = makeStyles((theme) => ({
    contentToolbar: {
        padding: theme.spacing(2),
        height: 100,
        display: 'flex',
        alignItems: 'flex-start',
        background: '#00d1b2',
    },
    contentHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        textTransform: 'uppercase',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));





interface Props {
    item: ResourceItem,
    actions: ActionsHash
}

function MainView({ item, actions }: Props) {
    const { contentToolbar, paper, contentHeader } = useStyles();
    const { name, actionIds, description, path, resourceType } = item;
    return (
        <Container>
            <AppBar position="relative" >
                <Toolbar className={contentToolbar} >
                    <Typography component="h3" variant="h5" noWrap >
                        {item.name}
                    </Typography>
                </Toolbar>
            </AppBar >
            <Paper className={paper}>
                <Grid container spacing={3}>
                    <Grid item md={6} >
                        <div className={contentHeader}>
                            <Typography color="primary" component="h4" variant="button" noWrap >
                                Details
                            </Typography>
                            <Tooltip title="Details for the resources" >
                                <Help />
                            </Tooltip>
                        </div>
                        <Field label="Name" id="name" value={name} />
                        <Field label="description" id="description" value={description} />
                        <Field label="Resource Type" id="resourceType" value={resourceType} />
                        <Field label="path" id="path" value={path} />

                    </Grid>
                    <Grid item md={6}>
                        <div className={contentHeader}>
                            <Typography color="primary" component="h4" variant="button" noWrap >
                                Actions
                            </Typography>
                            <Tooltip title="Details for the Actions" >
                                <Help />
                            </Tooltip>
                        </div>
                        {actionIds.map((id) =>
                            <Field
                                readOnly
                                key={id}
                                id={`action-${id}`}
                                value={actions[id].name}
                                 />)}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default MainView;