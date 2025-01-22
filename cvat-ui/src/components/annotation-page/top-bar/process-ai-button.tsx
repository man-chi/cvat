// process-ai-button.tsx
import React from 'react';
import Icon from '@ant-design/icons';
import Button from 'antd/lib/button';
import CVATTooltip from 'components/common/cvat-tooltip';
import { RedoIcon } from '../../../icons';

export default function ProcessAIButton(): JSX.Element {
    const processAI = (): void => {
        const canvasBackground = document.getElementById('cvat_canvas_wrapper');
        if (canvasBackground) {
            canvasBackground.innerHTML = '';
            const newImage = document.createElement('img');
            newImage.src = 'https://images.pexels.com/photos/7623202/pexels-photo-7623202.jpeg';
            newImage.style.width = '90%';
            newImage.style.height = '90%';
            newImage.style.objectFit = 'cover';
            canvasBackground.appendChild(newImage);
        }
    };

    return (
        <CVATTooltip overlay='Process AI'>
            <Button type='link' className='cvat-annotation-header-button' onClick={processAI}>
                <Icon component={RedoIcon} />
                AI
            </Button>
        </CVATTooltip>
    );
}
