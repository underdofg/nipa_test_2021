# API specification
This application running on port 3004
### 1.  API. create ticket
 Path: '/create-ticket' using post method.
        l. 1. api wiill recieve object into body 
            l. example :
            
            ``` Oblect 
            {
                "ticketTitle" : "exampleTicket",
                "ticketDescription" : "exampleDescription",
                "ticketContactInfo" : "exampleContanctInfo"   
            }
            ``` 