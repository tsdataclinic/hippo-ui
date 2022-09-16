import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import {Button} from '../src/index';

test('renders a button with innner text', async () => {
    render(<Button>Inner Text</Button>);
    const button = screen.getByRole('button');
    expect(button).toContainHTML('<button>Inner Text</button>');
});

test('renders a button with nested children', async () => {
    render(<Button><span>Child 1</span><span>Child 2</span></Button>);
    const button = screen.getByRole('button');
    expect(button).toContainHTML('<button><span>Child 1</span><span>Child 2</span></button>');
});