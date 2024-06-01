import React from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ProfilePage = () => {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  const { id, name, email, bio, post } = data;
  return (
    <Main>
      <Container>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} md={8}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h4" gutterBottom align="center">Profile</Typography>
                <Formik
                  initialValues={{ id, name, email, bio, post }}
                  onSubmit={(values, actions) => {
                    axios.put('/api/user', values)
                      .then((res) => {
                        mutate('/api/user', values, false);
                        console.log('Profile updated successfully');
                      })
                      .catch((err) => {
                        console.error('Error updating profile:', err);
                      })
                      .finally(() => {
                        actions.setSubmitting(false);
                      });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Field
                        name="name"
                        as={TextField}
                        label="Name"
                        fullWidth
                        margin="normal"
                      />
                      <Field
                        name="email"
                        as={TextField}
                        label="Email"
                        fullWidth
                        margin="normal"
                      />
                      <Field
                        name="bio"
                        as={TextField}
                        label="Bio"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                      />
                      <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>Save</Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Main>
  );
};

export default ProfilePage;
