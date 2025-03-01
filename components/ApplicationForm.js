'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Alert
} from '@mui/material';

export default function ApplicationForm({ jobTitle, jobId }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (submitted) {
      reset();
      setSubmitted(false);
    }
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', { ...data, jobId });
    setSubmitted(true);

  };

  return (
    <>
      <Button
        variant="contained"
        className="bg-blue-600 hover:bg-blue-700"
        fullWidth
        onClick={handleOpen}
      >
        Apply Now
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Apply for: {jobTitle}
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {submitted ? (
              <Alert severity="success" className="mb-4">
                Your application has been submitted successfully!
              </Alert>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Full Name"
                    fullWidth
                    {...register('fullName', { required: 'Full name is required' })}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone"
                    fullWidth
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\+?[0-9]{10,15}$/,
                        message: 'Invalid phone number'
                      }
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Current Company (optional)"
                    fullWidth
                    {...register('currentCompany')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="LinkedIn Profile (optional)"
                    fullWidth
                    {...register('linkedin')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Cover Letter"
                    fullWidth
                    multiline
                    rows={4}
                    {...register('coverLetter', {
                      required: 'Cover letter is required',
                      minLength: {
                        value: 50,
                        message: 'Cover letter should be at least 50 characters'
                      }
                    })}
                    error={!!errors.coverLetter}
                    helperText={errors.coverLetter?.message}
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} className="text-gray-600">
              {submitted ? 'Close' : 'Cancel'}
            </Button>
            {!submitted && (
              <Button
                type="submit"
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Submit Application
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}