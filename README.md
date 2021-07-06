# API specification
This application running on port 3004
### 1.  API. create ticket
 Path: '/create-ticket' using post method.
 1. This api wiill recieve object into body examle :
            
         
            {
                "ticketTitle" : "exampleTicket",
                "ticketDescription" : "exampleDescription",
                "ticketContactInfo" : "exampleContanctInfo"   
            }

 2. if success it will return ticketTitle , ticketId example :

            {
                "status" : 200,
                "ticketTitle" : "exampleTicket",
                "ticketId" : 1   
            }
