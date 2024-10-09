// Función para convertir un objeto a una cadena CSV
function objectToCSV(obj: Record<string, any>): string {
    const headers = Object.keys(obj);
    const values = Object.values(obj);

    const csv = [headers.join(','), values.join(',')].join('\n');
    return csv;
}

// Función para descargar un archivo CSV
export function downloadCSV(data: Record<string, any>, filename: string): void {
    const csv = objectToCSV(data);

    // Crear un Blob con el contenido CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Crear un enlace para descargar el archivo
    const link = document.createElement('a');
    if (link.download !== undefined) { // Verificar soporte de descarga
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}