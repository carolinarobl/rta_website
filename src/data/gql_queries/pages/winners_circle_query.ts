import { sectionSEO } from "~/data/constants";

export const winnersCircleQuery = (locale: string) => {
  return `query queryWinnerCircle{
    pageWinnersC(locale:"${locale}"){
      data{
        attributes{
          WinnersTitle
  
          WinnersBG{
            data{
              attributes{
                url
              }
            }
          }
          
          WinnersCarBG{
            data{
              attributes{
                url
              }
            }
          }
          Winners{
            data{
              attributes{
                url
              }
            }
          }
         
          GiveawayCarTitle
          
          GiveawayAnswers{
            Description
            AnswerDate
            QuestionVideos
            Answer
          }
          TwitterFeedLink
          TwitterFeedTitle
  
          ${sectionSEO}
        }
      }
    }
  }`;
};
