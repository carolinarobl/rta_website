export const telPopupQuery = (locationKey: string) => {
    return `query {
        offices(filters: { LocationKey: { eq: "${locationKey}" } }) {
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