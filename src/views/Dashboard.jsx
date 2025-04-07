import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import CreateEventCard from "../components/CreateEventCard";
import ActiveEvents from "../components/ActiveEvents";

const Dashboard = () => {
  return (
    <>
      <Box
        sx={{
          px: { xs: 2, sm: 4 },
          pt: { xs: 2, sm: 4 },
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Welcome Admin!
        </Typography>
      </Box>

      {/* Top Row - Cards */}
      <Grid container spacing={2} sx={{ px: { xs: 2, sm: 4 }, mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <CreateEventCard />
        </Grid>
        {/* Add more cards here if needed */}
      </Grid>

      {/* Bottom Row - Full Width All Events Card */}
      <Card sx={{ m: { xs: 2, sm: 4 }, mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            All Events
          </Typography>
          <ActiveEvents />
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
