export const sectionContactBoxesQuery = (locale:string)=>{
    return `
        sectionContactBoxes(locale:"${locale}"){
          data{
            attributes{
              Title{
                Text
              }
              BoxContent{
                Title
                Paragraph
                Buttons{
                  Text
                  Link
                }
              }
            }
          }
      }` 
}