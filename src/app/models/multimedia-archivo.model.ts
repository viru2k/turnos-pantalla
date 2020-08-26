export class MultimediaArchivo {
    public id: string;
    public archivo_nombre: string;
    public  archivo_nombre_original: string;
    public archivo_descripcion: string;
    public orden: string;
    public fecha_carga: string;
    public fecha_vencimiento: string;
    public tiene_vencimiento: string;
    public es_video: boolean;

    constructor(
        id: string,
        archivo_nombre: string,
        archivo_nombre_original: string,
        archivo_descripcion: string,
        orden: string,
        fecha_carga: string,
        fecha_vencimiento: string,
        tiene_vencimiento: string,
        es_video: boolean) {
        this.id = id;
        this.archivo_nombre = archivo_nombre;
        this.archivo_nombre_original = archivo_nombre_original;
        this.archivo_descripcion = archivo_descripcion;
        this.orden = orden;
        this.fecha_carga = fecha_carga;
        this.fecha_vencimiento = fecha_vencimiento;
        this.tiene_vencimiento = tiene_vencimiento;
        this.es_video = es_video;
    }
}