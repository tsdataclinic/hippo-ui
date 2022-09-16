import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../src/index';

describe('hippo-button', () => {
  test('should render a single child as expected', () => {
    render(<Button>Inner Text</Button>);

    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  test('should render multiple children as expected', () => {
    render(
      <Button>
        <span>Child 1</span>
        <span>Child 2</span>
      </Button>,
    );

    expect(screen.getByRole('button')).toMatchSnapshot();
  });
});
