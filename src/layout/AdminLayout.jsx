import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const sidebarWidth = 260;

  return (
    <Box
      sx={{
        display: 'flex',
        fontFamily: 'var(--font-family)',
        bgcolor: 'var(--bg-color)',
        color: 'var(--text-color)',
        height: '100vh',
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: `${sidebarWidth}px`,
          flexShrink: 0,
          bgcolor: 'var(--sidebar-bg-color)',
          display: { xs: 'none', sm: 'block' },
          position: 'fixed',
          height: '100vh',
          zIndex: 10,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          ml: { xs: 0, sm: `${sidebarWidth}px` },
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          height: '100vh',
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
