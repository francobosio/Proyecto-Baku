import React, { useState, useEffect, useMemo } from 'react';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const { user, isAuthenticated } = useAuth0();
const UsuarioContext = React.createContext();

export function UsuarioProvider(props) {
    [usuario, setUsuario] = useState(null);
    [estaAutenticado, setEstaAutenticado] = useState(false);

    useEffect(() => {
        async function cargarUsuario() {
            try{
                const { data: usuario } = await Axios.get('http://localhost:4000/usuarios') 
                setUsuario(user);
                setEstaAutenticado(isAuthenticated)
            } catch (error){
                console.log(error)
            }
        }
        cargarUsuario();
    }, [])

    const value = useMemo (() => {
        return ({
            user,
            estaAutenticado
        })
    })

    return <UsuarioContext.Provider value={value} {...props} />
}

export function useUsuario() {
    const context = React.useContext(UsuarioContext)
}