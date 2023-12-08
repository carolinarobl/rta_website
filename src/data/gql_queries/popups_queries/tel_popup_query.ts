export const telPopupQuery = (zipCode:string)=>{
    return `query {
        offices(filters: { locations: { ZipCode: { eq: ${zipCode} } } }) {
          data {
            attributes {
              Location
              Phone {
                Link
                Text
              }
            }
          }
        }
      }` 
}