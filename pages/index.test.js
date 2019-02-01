import React from 'react';
import { render, wait } from 'react-testing-library';
import Index from './index';

describe('smoke tests', function() {
  describe('w/o a previous session', function() {
    it('renders app title and sign in button', () => {
      const { getByText } = render(<Index />);
      expect(getByText('Ambitious ArcGIS App')).toBeInTheDocument();
    });
  });
});
