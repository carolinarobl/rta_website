import { type DocumentHeadValue } from "@builder.io/qwik-city";

// export const strapiURL = "https://strapi.cblsrv43.rtatel.com";
export const strapiURL = "https://strapi.rtatel.com";
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

export const headSEO = (SEOdata: any) => {
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

export const sectionNetwork = (locale: string) => `
sectionNetwork (locale:"${locale}"){
  data {
    attributes {
      Map {
        MapPicture {
          data {
            attributes {
              url
            }
          }
        }
        ServersTitle
        Servers {
          Text
          Link
          Icon{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
      Description{
        Title
        Paragraph
      }
    }
  }
}
`;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(dateStr: string, full = true) {
  const date = new Date(dateStr);
  const day = days[date.getDay()];
  const monthDay = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${full ? day + ", " : ""}${month} ${monthDay}, ${year}`;
}
