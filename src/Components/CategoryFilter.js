import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { filterByCategory } from '../redux/moviesSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.movies.categories);
  const selectedCategory = useSelector(state => state.movies.selectedCategory);

  const handleCategoryChange = (event) => {
    dispatch(filterByCategory(event.target.value));
  };

  return (
    <div className="category-filter mb-3">
      <Form.Group controlId="category">
        <Form.Label>Filter by category:</Form.Label>
        <Form.Select 
          value={selectedCategory} 
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default CategoryFilter;
