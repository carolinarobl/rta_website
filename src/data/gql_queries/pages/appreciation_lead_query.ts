import { mediaUrl, sectionSEO } from "~/data/constants"

export const appreciationLeadQuery = (locale: string) => {
    return `query QueryPageAprLead {
        pageAprLead(locale:"${locale}"){
          data {
            attributes {
              zane_lead {
                zane_pic {
                    ${mediaUrl}
                }
                give_pic {
                    ${mediaUrl}
                }
                cota_pic {
                    ${mediaUrl}
                }
                auto_pic {
                    ${mediaUrl}
                }
                live_pic {
                    ${mediaUrl}
                }
                phone_pic {
                    ${mediaUrl}
                }
                tv_pic {
                    ${mediaUrl}
                }
                wifi_pic {
                    ${mediaUrl}
                }
                bg_pic {
                    ${mediaUrl}
                }
              }
              zane_banner {
                banner_pic {
                    ${mediaUrl}
                }
              }
              zane_description
              iFrame_link
              date_race {
                Text
                Link
                Icon {
                  ${mediaUrl}
                }
              }
              button_promo {
                text
                icon {
                  ${mediaUrl}
                }
                link
              }
              pricing_box {
                Title
                Subtitle
                Pricing
                Period
                bg {
                  ${mediaUrl}
                }
                Icon {
                  ${mediaUrl}
                }
              }
              car {
                car_pic {
                  ${mediaUrl}
                }
              }
              ${sectionSEO}
              
            }
          }
        }
      }`
}