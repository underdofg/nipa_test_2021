# API specification
This application running on port 3004
### 1.  API. create ticket
 Path: '/create-ticket' using post method.
 1. api wiill recieve object into body examle :
            
            ``` Oblect 
            {
                "ticketTitle" : "exampleTicket",
                "ticketDescription" : "exampleDescription",
                "ticketContactInfo" : "exampleContanctInfo"   
            }
            ``` 