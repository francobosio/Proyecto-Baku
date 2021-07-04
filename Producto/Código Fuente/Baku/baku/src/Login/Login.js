const logo = {
    'display': 'block',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'width': '20%'
}

const logoGoogle = {
    'width': '6%',
    'position':'relative',
    'margin-right': '1em',
}

const botonGoogle = {
    'display': 'block',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'color':'#FFFFFF',
    'height': '3em',
    'width': '20em',
    'background':'#464D57',
    'border-radius': '3em',
    'font-weight': 'bold',
    'font-family': 'Roboto',
    'text-align': 'center',
    'font-size': '1em',
}

const recuperarClave = {
    'color': '#B0B0B0',
    'text-decoration': 'underline',
    'margin-left': '2em',
}

const centrado = {
    'display': 'block',
    'margin-left': '20em',
    'margin-right': 'auto',
}

const texto = {
    'margin-left': '2em',
}

const input = {
    'margin-left': '2em',
    'width': '50em',
}

const botonIniciar = {
    'display': 'block',
    'margin-left': '18em',
    'margin-right': 'auto',
    'color':'#FFFFFF',
    'height': '3em',
    'width': '10em',
    'background':'#4B9C8E',
    'border-radius': '3em',
    'font-weight': 'bold',
    'font-family': 'Roboto',
    'text-align': 'center',
    'font-size': '1em',
}

const botonRegistrate = {
    'display': 'block',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'color':'#FFFFFF',
    'height': '3em',
    'width': '20em',
    'background':'#4B9C8E',
    'border-radius': '3em',
    'font-weight': 'bold',
    'font-family': 'Roboto',
    'text-align': 'center',
    'font-size': '1em',
}

function Login(){
    return(
        <>
            <>
                <img src="imagenes/Logo_baku_negro.png" alt="Logo Baku" style={logo}></img>
                <br/>
                <hr></hr>
            </>
            <>
                <form>
                    <button style={botonGoogle}><img style={logoGoogle} src="imagenes/2000px-Google_G_Logo.png" alt="Logo Google"></img>Continuar con Google</button>
                    <hr></hr>
                </form>
            </>
            <>
                <div style={centrado}>
                    <form>
                        <h3 style={texto}>Dirección de correo electrónico o nombre de usuario:</h3>
                        <input style={input} type="text" placeholder="Dirección de correo electrónico o nombre de usuario"></input>
                        <h3 style={texto}>Contraseña:</h3>
                        <input style={input} type="password" placeholder="Contraseña"></input>
                        <br/>
                        <br/>
                        <a style={recuperarClave} href="www.google.com">¿Olvidaste tu contraseña?</a>
                        <br/>
                        <br/>
                        <button style={botonIniciar}>Iniciar Sesión</button>
                    </form>
                </div>
                <br/>
                <hr></hr>
                <button style={botonRegistrate}>REGISTRATE EN BAKU</button>
            </>
        </>
    )
}

export default Login