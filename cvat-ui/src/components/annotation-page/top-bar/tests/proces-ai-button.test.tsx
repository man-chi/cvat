// process-ai-button.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ProcessAIButton from '../process-ai-button';

// Mocking the antd Button component
jest.mock('antd/lib/button', () => ({
    __esModule: true,
    default: ({
        children,
        onClick,
        className,
    }: {
        children: React.ReactNode;
        onClick: () => void;
        className?: string;
    }) => (
        <button onClick={onClick} type='button' className={className}>
            {children}
        </button>
    ),
}));

// Mocking the Icon component
jest.mock('@ant-design/icons', () => ({
    __esModule: true,
    default: () => <span data-testid='mock-icon' />,
}));

// Mocking the CVATTooltip component
jest.mock('components/common/cvat-tooltip', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => children,
}));

describe('ProcessAIButton', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="cvat_canvas_wrapper"></div>';
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    it('adds an image to canvas when AI button is clicked', async () => {
        render(<ProcessAIButton />);

        // Check that the button and the icon are rendered
        const aiButton = screen.getByRole('button', { name: /AI/i });
        expect(aiButton).toBeInTheDocument();
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument();

        await userEvent.click(aiButton);

        // Check the image was added after clicking on AI button
        const canvasWrapper = document.getElementById('cvat_canvas_wrapper');
        const addedImage = canvasWrapper?.querySelector('img');

        expect(addedImage).toBeInTheDocument();
        expect(addedImage).toHaveAttribute('src', 'https://images.pexels.com/photos/7623202/pexels-photo-7623202.jpeg');
        expect(addedImage).toHaveStyle({
            width: '90%',
            height: '90%',
            objectFit: 'cover',
        });
    });
});
