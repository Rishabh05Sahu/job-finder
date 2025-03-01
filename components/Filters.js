'use client';

import { Paper, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch, Box } from '@mui/material';
import { useJobContext } from '@/context/JobContext';

export default function Filters() {
  const { jobs, filters, updateFilters } = useJobContext();
  

  const locations = [...new Set(jobs.map(job => job.location))];
  const categories = [...new Set(jobs.map(job => job.job_category))];
  const employmentTypes = [...new Set(jobs.map(job => job.employment_type))];
  
  return (
    <Paper className="p-4 mb-4">
      <Typography variant="h6" className="mb-3">Filters</Typography>
      
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FormControl fullWidth className="mb-2">
          <InputLabel>Location</InputLabel>
          <Select
            value={filters.location}
            label="Location"
            onChange={(e) => updateFilters({ location: e.target.value })}
          >
            <MenuItem value="">Any Location</MenuItem>
            {locations.map((location) => (
              <MenuItem key={location} value={location}>{location}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl fullWidth className="mb-2">
          <InputLabel>Job Category</InputLabel>
          <Select
            value={filters.jobCategory}
            label="Job Category"
            onChange={(e) => updateFilters({ jobCategory: e.target.value })}
          >
            <MenuItem value="">Any Category</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl fullWidth className="mb-2">
          <InputLabel>Employment Type</InputLabel>
          <Select
            value={filters.employmentType}
            label="Employment Type"
            onChange={(e) => updateFilters({ employmentType: e.target.value })}
          >
            <MenuItem value="">Any Type</MenuItem>
            {employmentTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControlLabel
          control={
            <Switch
              checked={filters.remoteOnly}
              onChange={(e) => updateFilters({ remoteOnly: e.target.checked })}
              color="primary"
            />
          }
          label="Remote Only"
          className="ml-2"
        />
      </Box>
    </Paper>
  );
}