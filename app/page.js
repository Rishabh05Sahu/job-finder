'use client'
import { Box, Typography } from '@mui/material';
import Filters from '@/components/Filters';
import JobList from '@/components/JobList';
import JobStats from '@/components/JobStats';

export default function Home() {
  return (
    <Box>
      <Typography variant="h4" component="h1" className="mb-6 font-bold">
        Find Your Dream Job
      </Typography>
      <JobStats />
      <Filters />
      <JobList />
    </Box>
  );
}