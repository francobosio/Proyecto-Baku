import React, { ReactElement, useState, useEffect } from 'react';
import { ToolbarProps, ToolbarSlot } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

//Scroll Mode
import { ScrollMode } from '@react-pdf-viewer/core';

import * as usuarioService from '../Sesión/Usuarios/UsuarioService'

const RenderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => {

    const [habilitado, setHabilitado] = useState(false)
    const cargarUsuario = async () => {
        const usuario_activo = localStorage.getItem("usuario_activo");
        const res = await usuarioService.getUsuario(usuario_activo!);
        console.log(res.data)
        if(res.data.tipoUsuario == 1)
        {
            console.log("El USUARIO es FREE")
        }
        else{
            setHabilitado(true)
            console.log("El USUARIO es PREMIUM o ADMINISTRADOR")
        }
    }

    useEffect(() => {
        cargarUsuario()
    }, [])

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
                            width: '100%',
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
                            {habilitado &&
                            <div style={{ padding: '0px 2px' }}>
                                <SwitchScrollMode mode={ScrollMode.Horizontal} />
                            </div>
                            }
                            <div style={{ padding: '0px 2px' }}>
                                <SwitchScrollMode mode={ScrollMode.Vertical} />
                            </div>
                            {habilitado &&
                            <div style={{ padding: '0px 2px' }}>
                                <SwitchScrollMode mode={ScrollMode.Wrapped} />
                            </div>
                            }
                    </div>
                );
            }}
        </Toolbar>
    )
};

export default RenderToolbar;