import { mediaUrl, sectionSEO } from "~/data/constants"

export const bastropProjectQuery = (locale:string)=>{
    return `query QueryBastropProject {
                pageBastropP(locale:"${locale}") {
                    data{
                        attributes{ 
                            showMap   

                            HeaderDesktop{
                                ${mediaUrl}
                            }
                            
                            HeaderMobile{
                                ${mediaUrl}
                            }

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
                            
                            FaqList(pagination:{limit:50}){
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

                            BottomPars{
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

                pageHome(locale:"${locale}"){
                    data{
                        attributes{
                            HeroForm{
                                ActionButton{
                                    Link
                                }
                            }
                        }
                    }
                }
            }`
}