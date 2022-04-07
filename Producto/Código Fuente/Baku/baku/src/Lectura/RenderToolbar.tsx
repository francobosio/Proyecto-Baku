import React, { ReactElement } from 'react';
import { ToolbarProps, ToolbarSlot } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

//Scroll Mode
import { ScrollMode } from '@react-pdf-viewer/scroll-mode';

const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => {

    function temaElegido() {
        if (localStorage.getItem('theme') == 'light')
        {
            return 'black';
        }
        return 'white';
    }

    return (
        <Toolbar>
            {(slots: ToolbarSlot) => {
                const {
                    CurrentPageInput,
                    EnterFullScreen,
                    GoToNextPage,
                    GoToPreviousPage,
                    NumberOfPages,
                    ShowSearchPopover,
                    Zoom,
                    ZoomIn,
                    ZoomOut,
                    SwitchTheme,
                    SwitchScrollMode,
                } = slots;
                return (
                    <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                            <div style={{ padding: '0px 2px' }}>
                                <ShowSearchPopover />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <ZoomOut />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <Zoom />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <ZoomIn />
                            </div>
                            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                <GoToPreviousPage />
                            </div>
                            <div style={{ padding: '0px 2px', width: '4rem'}}>
                                <CurrentPageInput />
                            </div>
                            <div style={{ padding: '0px 2px', color: `${temaElegido()}`}}>
                                 de <NumberOfPages />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <GoToNextPage />
                            </div>
                            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                <EnterFullScreen />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <SwitchTheme />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <SwitchScrollMode mode={ScrollMode.Horizontal} />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <SwitchScrollMode mode={ScrollMode.Vertical} />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <SwitchScrollMode mode={ScrollMode.Wrapped} />
                            </div>
                    </div>
                );
            }}
        </Toolbar>
    )
};

export default renderToolbar;