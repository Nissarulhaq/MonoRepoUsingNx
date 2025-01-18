import React from 'react';
import { render } from '@testing-library/react-native';

import CButton from './CButton';

describe('CButton', () => {
  it('should render successfully', () => {
    const { root } = render(<CButton />);
    expect(root).toBeTruthy();
  });
});
