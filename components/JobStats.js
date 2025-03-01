'use client';

import { Paper, Typography, Box, Grid } from '@mui/material';
import { useJobContext } from '@/context/JobContext';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';

export default function JobStats() {
  const { jobs } = useJobContext();
  
  
  const totalJobs = jobs?.length || 0;

  const totalCompanies = jobs && jobs.length > 0 
    ? new Set(jobs.filter(job => job?.company).map(job => job.company)).size 
    : 0;

  const totalLocations = jobs && jobs.length > 0 
    ? new Set(jobs.filter(job => job?.location).map(job => job.location)).size 
    : 0;
  

  const totalOpenings = jobs && jobs.length > 0 
    ? jobs.reduce((sum, job) => sum + (job?.number_of_opening || 0), 0)
    : 0;
  
  const stats = [
    { icon: <WorkIcon fontSize="large" />, label: 'Total Jobs', value: totalJobs, color: 'bg-blue-100 text-blue-800' },
    { icon: <BusinessIcon fontSize="large" />, label: 'Companies', value: totalCompanies, color: 'bg-purple-100 text-purple-800' },
    { icon: <LocationOnIcon fontSize="large" />, label: 'Locations', value: totalLocations, color: 'bg-green-100 text-green-800' },
    { icon: <PeopleIcon fontSize="large" />, label: 'Open Positions', value: totalOpenings, color: 'bg-amber-100 text-amber-800' }
  ];
  
  return (
    <Grid container spacing={3} className="mb-6">
      {stats.map((stat, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Paper className="p-4 h-full">
            <Box className={`rounded-full w-12 h-12 flex items-center justify-center mb-3 ${stat.color}`}>
              {stat.icon}
            </Box>
            <Typography variant="h5" className="font-bold">
              {String(stat.value)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {stat.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}