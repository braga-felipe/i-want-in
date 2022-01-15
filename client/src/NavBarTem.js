<AppBar className='nav-bar' position='static'>
  <Container maxWidth='xl'>
    <Toolbar disableGutters>
      <Typography
        variant='h6'
        noWrap
        component='div'
        sx={{
          fontFamily: 'Ubuntu',
          mr: 2,
          display: { xs: 'none', md: 'flex' },
        }}>
        WantIn
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleOpenNavMenu}
          color='inherit'>
          <MenuIcon />
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={() => {
            handleClickNavMenu();
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}>
          {pages.map((page) => (
            <MenuItem
              key={page}
              onClick={() => {
                handleClickNavMenu(`/${page.toLowerCase()}`);
              }}>
              <Typography textAlign='center'>{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Typography
        variant='h6'
        noWrap
        component='div'
        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        I-Want-In
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => {
              handleClickNavMenu(`/${page.toLowerCase()}`);
            }}
            sx={{ my: 2, color: 'white', display: 'block' }}>
            {page}
          </Button>
        ))}
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}>
          {settings.map((setting) => (
            <MenuItem
              key={setting}
              onClick={() => {
                handleClickNavMenu(`/${setting.toLowerCase()}`);
              }}>
              <Typography textAlign='center'>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
  </Container>
</AppBar>;
