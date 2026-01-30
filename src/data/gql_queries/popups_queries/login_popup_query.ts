export const loginPopupQuery = (locationKey: string) => `query {
        offices (filters: { LocationKey: { eq: "${locationKey}" } }) {
          data {
            attributes {
              InstanceLink
            }
          }
        }
      }`