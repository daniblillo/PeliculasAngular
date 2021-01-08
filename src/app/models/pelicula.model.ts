export class PeliculaModel {

    id?: string;
    Titulo?: string;
    Genero?: string;
    Director?: string;
    Descripcion?: string;
    Calificacion?: string;
    imagen?: string;
    fav?: Boolean;

    constructor() {
        this.fav = false;
    }

}

