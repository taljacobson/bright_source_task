import { useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import './App.css';

import { useFetchActions, useFetchResources } from './utils';

import SideBarItems from './components/SideBarItems';
import MainView from './components/MainView';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: '#4b555f',
  },
  mainArea: {
    display: 'flex',
    flexDirection: 'row',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));


function App() {
  const { appbar, mainArea, drawerPaper, appBarSpacer, container, ...rest } = useStyles();
  const [selectedResourceIndex, setSelectedResource] = useState<number | undefined>();
  const { items: actions } = useFetchActions()
  const { items, isLoading, hasError, error, } = useFetchResources()

  const content = useMemo(() => {
    if (isLoading) {
      return <CircularProgress />
    }
    if (items.length < 1) {
      return <Typography variant="button" >No items to show</Typography>
    }

    if (hasError) {
      return (
        <Container>
          <Typography variant="button" color="error"  >An Error -- oh no</Typography >
          <Typography variant="caption" >{error}</Typography>
        </Container>
      )
    }

    if (selectedResourceIndex === undefined) {
      return <Typography variant="button" >Please select an item</Typography>
    }
    return <MainView actions={actions} item={items[selectedResourceIndex]} />
  }, [actions, error, hasError, isLoading, items, selectedResourceIndex])

  return (
    <div className="App">
      <CssBaseline />
      <AppBar className={appbar} position="relative" >
        <Toolbar>
          <Typography component="h1" variant="h6" noWrap >
            Demo App
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={mainArea}>
        <Drawer
          variant="permanent"
          classes={{
            paper: drawerPaper,
          }}
        >
          <Toolbar >
            <Typography component="h1" variant="h6" color="inherit"  >
              Items
            </Typography>
          </Toolbar>
          <Divider />
          <List>{items.map((item, index) => <SideBarItems isActive={selectedResourceIndex === index} key={item.id} item={item} onClick={() => setSelectedResource(index)} />)} </List>
        </Drawer>
        <main className={rest.content}>
          <div className={appBarSpacer} />
          <Container maxWidth="lg" className={container}>
            {content}
          </Container>
        </main>
      </div>
    </div>
  );
}

export default App;
