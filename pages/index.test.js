import React from 'react';
import { render } from 'react-testing-library';
import Index from './index';

describe('smoke tests', function() {
  describe('w/o a previous session', function() {
    const title = 'Test Title';
    it('renders title', () => {
      const { getByText } = render(<Index title={title} />);
      expect(getByText(title)).toBeInTheDocument();
    });
    it('matches snapshot', () => {
      const { asFragment } = render(<Index title={title} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
