
export async function generateLead(first_name: string, last_name: string, email: string, phone_number:string, receive_txt:boolean, receive_mail:boolean, lat:string, long:string, customerNotes:string, splitAddress: string[]) {

    const apiKey = "3cBEFVR4qQleIRO2yWu0FcOCDdyZbuaU";

    const payload = {
      apiKey: apiKey,
      action: "createServiceOrder",
      customerType: "residential",
      networkType: "fiber",
      locationGroup: "bas",
      customer: {
        firstName: first_name,
        lastName: last_name,
        emailAddress: email,
        phone: phone_number ? [{ Type: "Mobile", Number: phone_number }] : [],
        customerNotes,
        physicalStreet: splitAddress[0] || "",
        physicalCity: splitAddress[1] || "",
        physicalState: splitAddress[2]?.split(' ')[0] || "",
        physicalZip: splitAddress[2]?.split(' ')[1] || "",
        physicalLatitude: lat,
        physicalLongitude: long
      },
      contactPreference: {
        phone: receive_txt,
        email: receive_mail,
        rangeTime: "Any time",
        promoInfobyEmail: false,
        promoInfobySMS: false
      },
      services: [],
      additionalServices: [],
      devices: [],
      fees: [],
      discounts: [],
      engageOption: ""
    };

    try {
    
    const response = await fetch('https://apps.cblsrv42.rtatel.com/planbuilder/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
        const successMsg = "Successfully Sent!";
        console.log(successMsg);
      }

    else{
      throw new Error(data?.message || 'Error while creating PW Lead');
    }


  } catch (error: any) {
    console.error('Error in generatePWLead API route:', error);
  }
}
