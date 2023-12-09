export const loginPopupQuery = (zipCode:string) => `query {
        offices (filters:{locations:{ZipCode:{eq:${zipCode}}}}) {
          data {
            attributes {
              InstanceLink
            }
          }
        }
      }`