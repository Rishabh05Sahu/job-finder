'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Paper, Chip, List, ListItem, ListItemIcon, ListItemText, Divider, Button, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import ApplicationForm from '@/components/ApplicationForm';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch('https://jsonfakery.com/jobs');
        const jobs = await response.json();
        const foundJob = jobs.find(j => j.id.toString() === id);


        if (foundJob && typeof foundJob.qualifications === 'string') {
          try {
            foundJob.qualifications = JSON.parse(foundJob.qualifications);
          } catch (e) {
            console.error('Error parsing qualifications:', e);
            foundJob.qualifications = [];
          }
        }

        setJob(foundJob);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center py-12">
        <CircularProgress />
      </Box>
    );
  }

  if (!job) {
    return (
      <Box className="flex justify-center items-center py-12">
        <Typography>Job not found.</Typography>
      </Box>
    );
  }


  const getQualifications = () => {
    if (Array.isArray(job.qualifications)) {
      return job.qualifications;
    }
    if (typeof job.qualifications === 'string') {
      try {
        return JSON.parse(job.qualifications);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const qualifications = getQualifications();

  return (
    <Box>
      <Link href="/" className="inline-block mb-4">
        <Button startIcon={<ArrowBackIcon />} className="text-blue-600">
          Back to Jobs
        </Button>
      </Link>

      <Paper className="p-6">
        <Box className="mb-4">
          <Typography variant="h4" component="h1" className="font-bold text-blue-700 mb-2">
            {job.title}
          </Typography>

          <Typography variant="h6" className="text-gray-700 mb-4">
            {job.company}
          </Typography>

          <Box className="flex flex-wrap gap-2 my-4">
            <Chip icon={<LocationOnIcon />} label={job.location} className="bg-gray-100" />
            <Chip icon={<WorkIcon />} label={job.employment_type} className="bg-gray-100" />

            <Chip label={job.job_category} className="bg-blue-100 text-blue-800" />
          </Box>
        </Box>

        <Divider className="my-4" />

        <Box className=" my-6">

          <h3 className='font-bold text-xl mb-2 '>Job Description</h3>
          <Typography variant="body1" className="whitespace-pre-line">{job.description}</Typography>
        </Box>

        <Box className="mb-6">

          <h3 className='font-bold text-xl'>Qualifications</h3>
          {qualifications.length > 0 ? (
            <List>
              {qualifications.map((qual, index) => (
                <p key={index}> ⏺  {qual},</p>
              ))}
            </List>
          ) : (
            <Typography>No specific qualifications listed.</Typography>
          )}
        </Box>




        <Divider className="my-4" />

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Box className="my-4">

            <h3 className='font-bold text-xl'>Job Details</h3>
            <List dense>
              <ListItem disableGutters>
                <ListItemIcon className="min-w-0 mr-2">
                  <AttachMoneyIcon className="text-gray-600" />
                </ListItemIcon>
                <ListItemText
                  primary="Salary Range"
                  secondary={job.salary_from && job.salary_to ? `₹${job.salary_from.toLocaleString()} - ₹${job.salary_to.toLocaleString()}` : "Salary not specified"}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon className="min-w-0 mr-2">
                  <PersonIcon className="text-gray-600" />
                </ListItemIcon>
                <ListItemText primary="Number of Openings" secondary={job.number_of_opening ?? "Not specified"} />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon className="min-w-0 mr-2">
                  <EventIcon className="text-gray-600" />
                </ListItemIcon>
                <ListItemText primary="Application Deadline" secondary={job.application_deadline ? new Date(job.application_deadline).toLocaleDateString() : "Not specified"} />
              </ListItem>
            </List>
          </Box>

          <Box className="my-4">

            <h3 className='font-bold text-xl'>Contact Information</h3>
            <List dense>
              <ListItem disableGutters>
                <ListItemIcon className="min-w-0 mr-2">
                  <PersonIcon className="text-gray-600" />
                </ListItemIcon>
                <ListItemText primary="Contact Person" secondary={job.contact?.name || "Not specified"} />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon className="min-w-0 mr-2">
                  <EmailIcon className="text-gray-600" />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={job.contact?.email || "Not specified"} />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon className="min-w-0 mr-2">
                  <PhoneIcon className="text-gray-600" />
                </ListItemIcon>
                <ListItemText primary="Phone" secondary={job.contact || "Not specified"} />
              </ListItem>
            </List>
          </Box>
        </Box>

        <Box className="mt-6">
          <ApplicationForm jobTitle={job.title} jobId={job.id} />
        </Box>
      </Paper>
    </Box>
  );
}