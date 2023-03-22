import React, { Children, useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-scroll/modules';

const Navbar = (props) => {
  const navItems = ['MAIN', 'ABOUT', 'SKILLS', 'PROJECTS', 'CONTACT'];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <List sx={{ gap: 2 }}>
        {Children.toArray(
          navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                sx={{
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: 'var(--color-yellow)',
                    color: 'black',
                  },
                }}
              >
                <Link
                  to={item.toLowerCase()}
                  spy={true}
                  smooth={true}
                  offset={-72}
                  duration={500}
                  onClick={handleDrawerToggle}
                >
                  <Typography sx={{ fontWeight: 500 }}>{item}</Typography>
                </Link>
              </ListItemButton>
            </ListItem>
          )),
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        component="nav"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: '72px',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          padding: '0 1.5rem',
        }}
      >
        <Toolbar>
          <Typography
            variant={'h2'}
            sx={{ fontWeight: 600, flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
          >
            포트폴리오
          </Typography>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiSvgIcon-root': {
                width: '42px',
                height: '42px',
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {Children.toArray(
              navItems.map((item) => (
                <Button key={item} sx={{ color: 'black' }}>
                  <Link
                    to={item.toLowerCase()}
                    spy={true}
                    smooth={true}
                    offset={-72}
                    duration={500}
                  >
                    {item}
                  </Link>
                </Button>
              )),
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          anchor={'top'}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          transitionDuration={250}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '100%',
              marginTop: '72px',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
