export const strapiURL = "https://strapi.cblsrv43.rtatel.com";
export const gqlURL = `${strapiURL}/graphql`;

export const setURL = (url: String) => {
  return `${strapiURL}${url}`;
};

export const customLocale = (locale: String) => {
  return locale === "es" ? "es-419" : locale;
};

export const mediaUrl = `
data {
    attributes {
        url
        alternativeText
        caption
    }
}
`;

export const sectionSEO = `
SEO {
    MetaTitle
    MetaDescription
    Keywords
    preventIndexing
}
`;

export const sectionBasicContent = `
data{
      attributes{
       	Content{
          Titles{
            Text
          }
          TextContent
        }
`;

// Query for the Members Grid. Used in:
// - Leadership Team Page
// - Board of Directors Page
export const sectionBoardMembers = `
MembersGrid{
           Picture{
         ${mediaUrl}
        }
        FirstName
        LastName
        Position
        SocialMedia{
          Icon{
            ${mediaUrl}
          }
          Link
        }
      }
`;