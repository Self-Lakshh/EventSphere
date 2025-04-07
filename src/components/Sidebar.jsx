import {
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Avatar
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Box
            sx={{
                width: { xs: '70px', sm: '240px' },
                bgcolor: 'var(--bg-color)',
                borderRight: '1px solid var(--secondary-bg-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                py: 3,
                px: 2,
                height: '100vh',
                position: 'fixed',
                top: 0,
                fontFamily: 'var(--font-family)',
                color: 'var(--text-color)',
            }}
        >
            <Box>
                {/* Logo */}
                <Box sx={{ textAlign: 'center', mb: 1 }}>
                    <Avatar
                        src="./assets/logo.png"
                        alt="Visioneers Logo"
                        sx={{
                            width: 60,
                            height: 60,
                            mx: 'auto',
                            mb: 1,
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            fontFamily: 'var(--font-family)',
                            color: 'var(--text-color)',
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        Visioneers
                    </Typography>
                </Box>

                <Divider sx={{ my: 1, borderColor: 'var(--secondary-bg-color)' }} />

                {/* Pages */}
                <List>
                    <ListItemButton
                        component={Link}
                        to="/dashboard"
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            '&:hover': {
                                bgcolor: 'var(--secondary-bg-color)',
                            },
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        <ListItemIcon sx={{ color: 'var(--text-color)', minWidth: '40px' }}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Dashboard"
                            primaryTypographyProps={{
                                sx: {
                                    display: { xs: 'none', sm: 'block' },
                                    fontWeight: 500,
                                    fontFamily: 'var(--font-family)',
                                },
                            }}
                        />
                    </ListItemButton>

                    <ListItemButton
                        component={Link}
                        to="/all-events"
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            '&:hover': {
                                bgcolor: 'var(--secondary-bg-color)',
                            },
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        <ListItemIcon sx={{ color: 'var(--text-color)', minWidth: '40px' }}>
                            <EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="All Events"
                            primaryTypographyProps={{
                                sx: {
                                    display: { xs: 'none', sm: 'block' },
                                    fontWeight: 500,
                                    fontFamily: 'var(--font-family)',
                                },
                            }}
                        />
                    </ListItemButton>
                </List>
            </Box>

            {/* Admin Footer - Moved slightly above bottom */}
            <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{
                    px: 1,
                    py: 2,
                    mb: 5,
                    borderRadius: 2,
                }}
            >
                <Avatar src="https://ui-avatars.com/api/?name=Admin" alt="Admin" />
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Typography
                        variant="body2"
                        fontWeight="600"
                        sx={{ color: 'var(--text-color)' }}
                    >
                        Admin
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: 'var(--text-color)' }}
                    >
                        Administrator
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
