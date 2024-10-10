import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";

export const downloadPDF = (idElement: string) => {
    const element = document.getElementById(idElement);
    const name = idElement.replace('div-plan-', '');

    element!.querySelectorAll('hr').forEach(hr => {
        hr.style.marginTop = '5px';
        hr.style.marginBottom = '5px';
    });

    html2canvas(element!, { scale: 1 }).then(canvas => {

        const imgData = canvas.toDataURL('image/png');

        // Convertir píxeles a milímetros
        const pdfWidth = (325 / 96) * 25.4;  // Ancho en milímetros
        const pdfHeight = (1300 / 96) * 25.4; // Altura en milímetros

        // Crear PDF con tamaño personalizado
        const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);

        // Ajustar el tamaño de la imagen en el PDF
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // Recorrer todos los enlaces en el elemento
        const links = element!.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            const rect = link.getBoundingClientRect();

            // Convertir la posición del enlace de píxeles a milímetros
            const x = (rect.left / 96) * 25.4;
            const y = (rect.top / 96) * 25.4;
            const width = (rect.width / 96) * 25.4;
            const height = (rect.height / 96) * 25.4;

            // Añadir un enlace al PDF
            pdf.link(x, y, width, height, { url: href });
        });
        pdf.save(name + '.pdf');
    });

    element!.querySelectorAll('hr').forEach(hr => {
        hr.style.marginTop = '0px';
        hr.style.marginBottom = '0px';
    });
}

export const downloadPNG = (idElement: string) => {
    const element = document.getElementById(idElement);
    const name = idElement.replace('div-plan-', '');

    element!.querySelectorAll('hr').forEach(hr => {
        hr.style.marginTop = '5px';
        hr.style.marginBottom = '5px';
    });

    html2canvas(element!, { scale: 1 }).then(canvas => {

        const imgData = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = imgData;
        link.download = `${name}.png`;
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    element!.querySelectorAll('hr').forEach(hr => {
        hr.style.marginTop = '0px';
        hr.style.marginBottom = '0px';
    });
}