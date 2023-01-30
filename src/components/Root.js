import * as React from "react";
import { styled, useTheme, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Outlet } from "react-router-dom";
import TodayIcon from "@mui/icons-material/Today";
import {
  AppBar as MUIAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  CssBaseline,
  Drawer,
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@mui/material";

import { Link } from "react-router-dom";

const drawerWidth = 240;
const AppBar = styled(MUIAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const navTheme = createTheme({
  palette: {
    primary: { main: "#ff1744" },
    text: { main: "#ffffff" },
  },
  typography: {
    title: {
      color: "#ffffff",
      fontWeight: "500",
      fontSize: "25px",
    },
  },
});

const drawerNavigations = [
  { id: 1, label: "Customers", Icon: <PersonIcon />, href: "/" },
  {
    id: 2,
    label: "Trainings",
    Icon: <FitnessCenterIcon />,
    href: "/training",
  },
  { id: 3, label: "Calendar", Icon: <TodayIcon />, href: "/calendar" },
];

export default function Root() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        <CssBaseline />
        <ThemeProvider theme={navTheme}>
          <AppBar position="relative" open={open}>
            <Toolbar>
              <IconButton
                color="primary"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon color="text" />
              </IconButton>

              <Typography
                variant="title"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Personal Trainner
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            <Divider />
            {drawerNavigations.map(({ id, Icon, label, href }) => (
              <Link
                to={href}
                style={{ textDecoration: "none", color: "inherit" }}
                key={id}
              >
                <ListItem button>
                  <ListItemIcon>{Icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
      </Box>
      <Outlet />
    </>
  );
}
