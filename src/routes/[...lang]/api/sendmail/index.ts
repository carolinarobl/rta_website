export async function sendMail(template: string, subject: string, destEmail: string, inputs:object, lang: string, attached?:string) {
  const attachmentURL = attached ? "/attachment" : '';
  const url = `https://supa42.rtatel.com/notifications/api${attachmentURL}`;

    const bodyData:any = {
      action: "rtaMail",
      subject: subject,
      template: template,
      mailto: destEmail,
      variables: inputs,
    };

    // Si attached tiene un valor, lo añadimos al bodyData
    if (attached) {
      bodyData.attachment = {
        filename: "resume.pdf",
        file: attached};
    }

    try {
      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      
      if (resp.ok) {
        // location.reload();
        alert(`Formulario enviado con éxito: ${JSON.stringify(bodyData)}`);
      }
      
      else {
        const errorData = await resp.json();
        const errorMsg = lang.includes('es') ? "Error al enviar el formulario: " : "Error while trying to send the form: ";
        alert(`${errorMsg} ${errorData.message}`);
      }
    }
    
    catch (error) {
    console.error('Error en la solicitud:', error);
    alert('Hubo un error al enviar el formulario.');
    }

}
