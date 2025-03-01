'use client';

import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import JobCard from './JobCard';
import { useJobContext } from '@/context/JobContext';

export default function JobList() {
  const { filteredJobs, loading } = useJobContext();
  
  if (loading) {
    return (
      <Box className="flex justify-center items-center py-12">
        <CircularProgress />
      </Box>
    );
  }
  
  if (filteredJobs.length === 0) {
    return (
      <Box className="py-8 text-center">
        <Typography variant="h6" color="textSecondary">
          No jobs found matching your criteria.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Grid container spacing={3}>
      {filteredJobs.map((job) => (
        <Grid item xs={12} sm={6} md={4} key={job.id}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>
  );
}