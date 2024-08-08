import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { toggleLike, toggleDislike } from '../redux/moviesSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  const handleLikeClick = () => {
    dispatch(toggleLike(movie.id));
  };

  const handleDislikeClick = () => {
    dispatch(toggleDislike(movie.id));
  };

  return (
    <Card className="text-center mb-3">
      <Card.Header>Category: {movie.category}</Card.Header>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          <Button 
            variant={movie.liked ? 'success' : 'primary'} 
            onClick={handleLikeClick}
            className="me-2"
          >
            {movie.liked ? 'Unlike' : 'Like'}
          </Button>
          <span>Likes: {movie.likes}</span>
          <Button 
            variant={movie.disliked ? 'danger' : 'secondary'} 
            onClick={handleDislikeClick}
            className="ms-2"
          >
            {movie.disliked ? 'Undislike' : 'Dislike'}
          </Button>
          <span className="ms-2">Dislikes: {movie.dislikes}</span>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Last updated {new Date().toLocaleDateString()}</Card.Footer>
    </Card>
  );
};

export default MovieCard;
