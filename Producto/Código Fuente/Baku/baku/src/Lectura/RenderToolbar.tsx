import React, { ReactElement, useState, useEffect } from 'react';
import { ToolbarProps, ToolbarSlot } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

//Scroll Mode
import { ScrollMode } from '@react-pdf-viewer/core';

import * as usuarioService from '../Sesión/Usuarios/UsuarioService'

//GRID
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

//RESPONSIVE
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const RenderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => {
    //RESPONSIVE
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    //TIPO DE USUARIO - PREMIUM o FREE
    const [habilitado, setHabilitado] = useState(false)
    const cargarUsuario = async () => {
        const usuario_activo = localStorage.getItem("usuario_activo");
        const res = await usuarioService.getUsuario(usuario_activo!);
        if(res.data.tipoUsuario == 1)
        {
        }
        else{
            setHabilitado(true)
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
                                <style >
                                    { matches ?
                                        `
                                            .rpv-default-layout__toolbar {
                                                height: 2.5rem !important;
                                            }
                                        `   :
                                        `
                                            .rpv-default-layout__toolbar {
                                                height: 4.2rem !important;
                                            }
                                            .rpv-default-layout__sidebar {
                                                padding-top: 4.2rem !important;
                                            }
                                            .rpv-default-layout__body {
                                                padding-top: 4.2rem !important;
                                            }

                                        `
                                    }
                                </style>
                                {matches ?
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
                                        <div style={{ padding: '0px 6px', width: '3rem'}}>
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
                                            <SwitchScrollMode mode={ScrollMode.Vertical} />
                                        </div>
                                        }
                                        {habilitado &&
                                        <div style={{ padding: '0px 2px' }}>
                                            <SwitchScrollMode mode={ScrollMode.Horizontal} />
                                        </div>
                                        }
                                        {habilitado &&
                                        <div style={{ padding: '0px 2px' }}>
                                            <SwitchScrollMode mode={ScrollMode.Wrapped} />
                                        </div>
                                        }
                                    </div>
                                    :
                                    <Grid container spacing={0} alignItems="center" justifyContent="center">
                                        <Grid container item xs={1.5} xl={1} justifyContent="center">
                                            <div style={{ padding: '0px 2px' }}>
                                                <ShowSearchPopover />
                                            </div>
                                        </Grid>
                                        <Grid container item xs={4} xl={2}>
                                            <Stack direction="row" alignItems="center" justifyContent="center">
                                                <div style={{ padding: '0px 2px' }}>
                                                    <ZoomOut />
                                                </div>
                                                <div style={{ padding: '0px 2px' }}>
                                                    <Zoom />
                                                </div>
                                                <div style={{ padding: '0px 2px' }}>
                                                    <ZoomIn />
                                                </div>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={1.5} xl={3}>
                                            <div style={{ padding: '0px 2px', display: 'flex', alignItems: "center" , justifyContent: "center"}}>
                                                <EnterFullScreen />
                                            </div>
                                        </Grid>
                                        <Grid item xs={1.5} xl={2}>
                                            <div id="ST" style={{ padding: '0px 2px', display: 'flex', alignItems: "center" , justifyContent: "center"}}>
                                                <SwitchTheme />
                                            </div>
                                        </Grid>
                                        <Grid item xs={3.5} xl={4}>
                                            <Stack direction="row" alignItems="center" justifyContent="center">
                                                {habilitado &&
                                                <div style={{ padding: '0px 2px' }}>
                                                    <SwitchScrollMode mode={ScrollMode.Vertical} />
                                                </div>
                                                }
                                                {habilitado &&
                                                <div style={{ padding: '0px 2px' }}>
                                                    <SwitchScrollMode mode={ScrollMode.Horizontal} />
                                                </div>
                                                }
                                                {habilitado &&
                                                <div style={{ padding: '0px 2px' }}>
                                                    <SwitchScrollMode mode={ScrollMode.Wrapped} />
                                                </div>
                                                }
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} xl={2} justifyContent="center" alignItems="center">
                                            <Stack direction="row" alignItems="center" justifyContent="center">
                                                <div style={{ padding: '0px 2px' }}>
                                                    <GoToPreviousPage />
                                                </div>
                                                <div style={{ padding: '0px 6px', width: '3rem'}}>
                                                    <CurrentPageInput />
                                                </div>
                                                <div style={{ padding: '0px 2px', color: `${temaElegido()}`}}>
                                                    de <NumberOfPages />
                                                </div>
                                                <div style={{ padding: '0px 2px' }}>
                                                    <GoToNextPage />
                                                </div>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                }
                        </div>
                    );
                }}
            </Toolbar>
    )
};

export default RenderToolbar;