export const loginPopupQuery = (zipCode:string)=>{
    return `  query {
        offices (filters:{locations:{ZipCode:{eq:${zipCode}}}}) {
          data {
            attributes {
              InstanceLink
            }
          }
        }
      }`
}