import { mediaUrl, sectionSEO } from "~/data/constants";

export const testimonialsQuery = (locale: string) => {
  return `query queryTestimonials{
    pageTestimon(locale:"${locale}"){
      data{
        attributes{
          Testimonials{
            Title
            Text
          }
          VideoTitle
          TestimBG{
           ${mediaUrl}
          }
          Video{
            ${mediaUrl}
          }
          ${sectionSEO}
        }
      }
    }
  }`;
};
