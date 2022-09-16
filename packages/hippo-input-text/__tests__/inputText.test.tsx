import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InputText } from '../src/index';

describe('hippo-button', () => {
  test('should render with an initial value', () => {
    render(<InputText value="initial"></InputText>);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('initial');
  });
});
