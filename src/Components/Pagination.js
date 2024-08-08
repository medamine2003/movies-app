import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { setItemsPerPage, setCurrentPage } from '../redux/moviesSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { filteredMovies, currentPage, itemsPerPage } = useSelector(state => state.movies);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    dispatch(setItemsPerPage(Number(e.target.value)));
    dispatch(setCurrentPage(1)); 
  };

  return (
    <div className="pagination d-flex align-items-center justify-content-between mt-3">
      <Button 
        variant="outline-primary"
        disabled={currentPage === 1} 
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
      >
        Précédent
      </Button>
      <span>Page {currentPage} sur {totalPages}</span>
      <Button 
        variant="outline-primary"
        disabled={currentPage === totalPages} 
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
      >
        Suivant
      </Button>
      <Form.Group controlId="category">
      <Form.Label>Number of films per page:</Form.Label>
      <Form.Select 
        value={itemsPerPage} 
        onChange={handleItemsPerPageChange}
        className="w-auto"
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="12">12</option>
      </Form.Select>
      </Form.Group>
    </div>
  );
};

export default Pagination;
