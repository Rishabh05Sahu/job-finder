'use client';

import { useState } from 'react';
import { Grid, Typography, CircularProgress, Box, Pagination } from '@mui/material';
import JobCard from './JobCard';
import { useJobContext } from '@/context/JobContext';

export default function JobList() {
  const { filteredJobs, loading } = useJobContext();

  const jobsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);


  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);


  const startIndex = (currentPage - 1) * jobsPerPage;
  const selectedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
    <Box>
      <Grid container spacing={3}>
        {selectedJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>

      <Box className="flex justify-center my-6">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="medium"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "@media (max-width: 600px)": {
              size: "small",
              "& .MuiPagination-ul": {
                flexWrap: "nowrap",
                overflowX: "hidden",
                justifyContent: "center"
              }
            }
          }}
        />
      </Box>

    </Box>
  );
}
