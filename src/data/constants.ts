import { DocumentHeadValue } from "@builder.io/qwik-city";

export const strapiURL = "https://strapi.cblsrv43.rtatel.com";
export const gqlURL = `${strapiURL}/graphql`;

export const setURL = (url: string) => {
  return `${strapiURL}${url}`;
};

export const customLocale = (locale: string) => {
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

export const headSEO: DocumentHeadValue = (SEOdata: any) => {
  return <DocumentHeadValue>{
    title: SEOdata.MetaTitle,
    meta: [
      {
        name: "description",
        content: SEOdata.MetaDescription,
      },
      {
        name: "robots",
        content: SEOdata.preventIndexing ? "noindex" : "index",
      },
      {
        name: "keywords",
        content: SEOdata.Keywords,
      },
    ],
  };
};

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
