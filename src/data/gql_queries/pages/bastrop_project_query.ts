import { mediaUrl, sectionSEO } from "~/data/constants"

export const bastropProjectQuery = (locale:string)=>{
    return `query QueryBastropProject {
                pageBastropP(locale:"${locale}") {
                    data{
                        attributes{    

                            IntroPar{
              	                Title
                                Paragraph
                                Media{
                                    ${mediaUrl}
                                }
                                Buttons{
                                    Text
                                    Link
                                }
                            }

                            FaqPar{
              	                Title
                                Paragraph
                                Buttons{
                                    Text
                                    Link
                                }
                            }
                            
                            FaqList{
                                Title
                                Paragraph
                                Disclaimer{
                                    Icon{
                                        ${mediaUrl}
                                    }
                                    Title
                                    Text
                                    Caption
                                }
                                    
                                Table(pagination: { limit: 50 }){
                                    ColumnOne
                                    ColumnTwo
                                    ColumnThree
                                }
                            }

                            ContactPar{
              	                Title
                                Paragraph
                                Media{
                                    ${mediaUrl}
                                }
                                Buttons{
                                    Text
                                    Link
                                }
                            }
              
                            ${sectionSEO}
                        }
                    }
                }
            }`
}