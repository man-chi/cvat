// Copyright (C) 2020-2022 Intel Corporation
// Copyright (C) 2023 CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Icon from '@ant-design/icons';

import { AIToolsIcon } from 'icons';
import { ShapeType } from 'reducers';
import { Canvas3d } from 'cvat-canvas3d-wrapper';
import { Canvas } from 'cvat-canvas-wrapper';
import Popover from 'antd/lib/popover';
import DrawShapePopoverContainer from 'containers/annotation-page/standard-workspace/controls-side-bar/draw-shape-popover';
import withVisibilityHandling from './handle-popover-visibility';

export interface Props {
    disabled?: boolean;
    dynamicIconProps?: Record<string, any>;
    isDrawing: boolean;
    canvasInstance: Canvas | Canvas3d;
}

const CustomPopover = withVisibilityHandling(Popover, 'draw-mask');
function AiControl(props: Props): JSX.Element {
    const { canvasInstance, isDrawing, disabled } = props;
    const dynamicPopoverProps = isDrawing ? {
        overlayStyle: {
            display: 'none',
        },
    } : {};

    const dynamicIconProps = isDrawing ? {
        className: 'cvat-ai-control cvat-active-canvas-control',
        onClick: (): void => {
            canvasInstance.draw({ enabled: false });
        },
    } : {
        className: 'cvat-ai-control',
    };

    return disabled ? (
        <Icon className='cvat-ai-control cvat-disabled-canvas-control' component={AIToolsIcon} />
    ) : (
        <CustomPopover
            {...dynamicPopoverProps}
            overlayClassName='cvat-draw-shape-popover'
            placement='right'
            content={<DrawShapePopoverContainer shapeType={ShapeType.MASK} />}
        >
            <Icon {...dynamicIconProps} component={AIToolsIcon} />
        </CustomPopover>
    );
}

export default React.memo(AiControl);
