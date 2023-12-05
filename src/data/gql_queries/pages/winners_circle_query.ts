import { mediaUrl, sectionSEO } from "~/data/constants";

export const winnersCircleQuery = (locale: string) => {
  return `query queryWinnerCircle{
    pageWinnersC(locale:"${locale}"){
      data{
        attributes{
          WinnersTitle
  
          WinnersBG{
            ${mediaUrl}
          }
          
          WinnersCarBG{
           ${mediaUrl}
          }
          Winners{
            ${mediaUrl}
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
