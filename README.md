# API specification
This application running on port 3004
### 1.  API create ticket
 Path: '/create-ticket' using post method.
 #### This api only reciece JSON body and it's required ticketTitle, ticketDescription , ticketContactInfo examle :
         
            {
                "ticketTitle" : "exampleTicket",
                "ticketDescription" : "exampleDescription",
                "ticketContactInfo" : "exampleContanctInfo"   
            }

 1. if success it will return ticketTitle , ticketId example :

            {
                "status" : 200,
                "ticketTitle" : "exampleTicket",
                "ticketId" : 1   
            }
 