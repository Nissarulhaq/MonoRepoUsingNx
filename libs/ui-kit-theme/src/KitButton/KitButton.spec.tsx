import React from 'react';
import { render } from '@testing-library/react-native';

import KitButton from './KitButton';

describe('KitButton', () => {
  it('should render successfully', () => {
    const { root } = render(<KitButton />);
    expect(root).toBeTruthy();
  });
});
