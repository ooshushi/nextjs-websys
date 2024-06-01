import React from 'react';
import { Container, Typography, TextField, Button, IconButton, Grid, Card, CardContent } from '@mui/material';
import { Formik, Form, Field, FieldArray } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';
import DeleteIcon from '@mui/icons-material/Delete';

const fetcher = (url:string) => axios.get(url).then((res) => res.data);

const ProfilePage = () => {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h4" gutterBottom align="center">Posts</Typography>
                <Formik
                  initialValues={{ posts: data.post }}
                  onSubmit={(values, actions) => {
                    axios.put('/api/user', { ...data, post: values.posts })
                      .then((res) => {
                        mutate('/api/user', { ...data, post: values.posts }, false);
                        console.log('Posts updated successfully');
                      })
                      .catch((err) => {
                        console.error('Error updating posts:', err);
                      })
                      .finally(() => {
                        actions.setSubmitting(false);
                      });
                  }}
                >
                  {({ values, isSubmitting }) => (
                    <Form>
                      <FieldArray name="posts">
                        {({ push, remove }) => (
                          <div>
                            {values.posts.map((post: string, index: number) => (
                              <div key={index} style={{ marginBottom: '1rem' }}>
                                <Grid container spacing={2} alignItems="center" component="div">
                                  <Grid item xs={8}>
                                    <Field
                                      name={`posts.${index}.title`}
                                      as={TextField}
                                      label="Title"
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item xs={8}>
                                    <Field
                                      name={`posts.${index}.content`}
                                      as={TextField}
                                      label="Content"
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item>
                                    <IconButton onClick={() => remove(index)} aria-label="delete" color="secondary">
                                      <DeleteIcon />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </div>
                            ))}
                            <Button variant="contained" color="primary" onClick={() => push({ title: '', content: '' })}>
                              Add Post
                            </Button>
                          </div>
                        )}
                      </FieldArray><br /><br />
                      <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                        Save
                      </Button>
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
