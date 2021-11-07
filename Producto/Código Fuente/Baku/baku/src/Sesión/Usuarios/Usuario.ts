export interface Usuario {
    auth0_id: string;
    apellido: string;
    nombre: string;
    correo_electronico: string;
    fecha_nacimiento: Date;
    libros_publicados: [];
    libros_leidos:[];
}