export const layoutQuery = (locale: string) => `
query QueryLayout {
    generalMenu(locale: "${locale}") {
      data {
        attributes {
          TopOptions {
            Icon {
              data {
                attributes {
                  url
                }
              }
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
              data {
                attributes {
                  url
                }
              }
            }
            Switcher {
              Text
              Link
              Icon {
                data {
                  attributes {
                    url
                  }
                }
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
              data {
                attributes {
                  url
                }
              }
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
              data {
                attributes {
                  url
                }
              }
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
                data {
                  attributes {
                    url
                  }
                }
              }
              Link
            }
          }
        }
      }
    }
  } 
`;
