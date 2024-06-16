import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders Home component content', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  
  // Assuming the Home component has a heading with "Home Page" text
  const headingElement = screen.getByText(/home page/i);
  expect(headingElement).toBeInTheDocument();
});
