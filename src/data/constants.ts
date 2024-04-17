import { type DocumentHeadValue } from "@builder.io/qwik-city";

export const strapiURL = "https://strapi.rtatel.com";
// Strapi por dominio
// export const strapiURL = "https://strapi.rtatel.com";

// Strapi por ip interna
export const strapiGQLURL = "http://10.5.24.41:1337";

export const gqlURL = `${strapiGQLURL}/graphql`;

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
        formats
    }
}
`;



export const headSEO = (SEOdata: any) => {
  let schemaScripts = [];
  let isSimpleScript: boolean = true;
  
  if (SEOdata.schema) {

    if (SEOdata.schema.includes(`<script type="application/ld+json">`)) {
      isSimpleScript = false;
  } 

  schemaScripts = SEOdata.schema
  .split(isSimpleScript ? '<script>' :`<script type="application/ld+json">`)
  .flatMap((scr: string) =>
    scr.split(isSimpleScript ? '<script>' :`<script type="application/ld+json">`),
  )
  .flatMap((script: string) => {
    return script.replace("</script>", "");
  });


    // .filter((script: string) => script !== null);
  }

  return <DocumentHeadValue>{
    title: SEOdata.MetaTitle,
    scripts: [
      ...schemaScripts.map((script: string) => {
        return {
          props: isSimpleScript ? {} : {
            type: "application/ld+json",
          },
          script: script,
        };
      }),
    ],
    meta: [
      {
        name: "description",
        content: SEOdata.MetaDescription,
      },
      // {
      //   name: "robots",
      //   content: SEOdata.preventIndexing ? "noindex" : "index",
      // },
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
    schema
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
          ${mediaUrl}
        }
        ServersTitle
        Servers (pagination:{limit:50}){
          Text
          Link
          Icon{
            ${mediaUrl}
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
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
  return `${full ? day + ", " : ""}${
    full ? month : month.slice(0, 3)
  } ${monthDay}, ${year}`;
}
