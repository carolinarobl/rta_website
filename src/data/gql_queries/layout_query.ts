import { mediaUrl } from "../constants";

export const layoutQuery = (locale: string) => `
query QueryLayout {
    generalMenu(locale: "${locale}") {
      data {
        attributes {
          TopOptions {
            Icon {
              ${mediaUrl}
            }
            Text
            Link
          }
  
          localizations {
            data {
              attributes {
                MainOptions {
                  Text
                  Link
                  SubOption {
                    Text
                    Link
                  }
                }
              }
            }
          }
  
          MainMenu {
            Logo {
              ${mediaUrl}
            }
            Switcher {
              Text
              Link
              Icon {
                ${mediaUrl}
              }
            }
          }
          MainOptions {
            Text
            Link
            SubOption {
              Text
              Link
              MenuOption {
                data {
                  attributes {
                    SubOption {
                      Text
                      Link
                    }
                  }
                }
              }
            }
          }
          ClientOptions {
            Text
            Link
          }
          gigfastOptions {
            Text
            Link
            Icon {
              ${mediaUrl}
            }
          }
        }
      }
    }
    generalFooter(locale: "${locale}") {
      data {
        attributes {
          SupportSection {
            Title
            Paragraph
            Buttons {
              Text
              Link
            }
          }
          CorpInfo {
            Media {
              ${mediaUrl}
            }
            Paragraph
            Buttons {
              Text
              Link
            }
          }
          Menus {
            Text
            SubOption {
              Text
              Link
            }
          }
          SocialMedia {
            Text
            SubOption {
              Icon {
                ${mediaUrl}
              }
              Link
            }
          }
        }
      }
    }
    generalHeader(locale: "${locale}")  {
      data {
        attributes {
          Slide {
            Title
            Paragraph
            Buttons {
              Text
              Link
            }
          }
          CallButton{
            Text
            Link
          }
        }
      }
    }
  } 
`;
