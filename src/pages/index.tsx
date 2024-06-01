import React from "react";
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import { Container, Typography, Grid, Card, CardContent } from '@material-ui/core';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  title: string;
  content: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  post: Post[];
}

const Home: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='profile-section'>
        <div className="mb-40">
          <Typography variant="h3" gutterBottom>{data.name}</Typography>
          <Typography variant="h6" gutterBottom style={{ color: 'white' }}>{data.email}</Typography>
          <Typography variant="body2" gutterBottom style={{ color: 'white' }}>{data.bio}</Typography>
        </div>
        <Typography variant="h6" gutterBottom style={{ marginTop: '2rem'}}>Posts</Typography>
        <Grid container spacing={3}>
          {data.post.map((post, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className="post-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom>{post.title}</Typography>
                  <Typography variant="body2" gutterBottom>{post.content}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <style jsx>{`
        .post-card {
          transition: transform 0.3s;
        }
        .post-card:hover {
          transform: scale(1.05);
        }
      `}</style>
    </Main>
  );
};

export default Home;
