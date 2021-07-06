## APIs specification
1. This support api's has 3 URLs - 1. URL create ticket , 2. URL update ticket , 3. URL for finding list of tickets.
2. This application is running on port 3004
3. This application using Postgres DB and hosted on AWS RDS. 
## Running Script

```
    npm run start
```

## 1.  API create ticket
 **Path: '/create-ticket' using POST method.**
 #### This api only receives JSON body. It's required *"ticketTitle"* and having other attributes such as *"ticketDescription" , "ticketContactInfo"*. Values of all attributes are varchar(50). example :

         
            {
                "ticketTitle" : "exampleTicket",
                "ticketDescription" : "exampleDescription",
                "ticketContactInfo" : "exampleContanctInfo"   
            }

 1. if creating ticket success it will return *"ticketTitle"* and *"ticketId"* example :

            {
                "status" : "success",
                "ticketTitle" : "exampleTicket",
                "ticketId" : 1   
            }

    if error sever will send error and error message. example -

            {
                "status"  : "not success",
                "message" : "error example."
            }

 2. Another of attribute of JSON body is not accepted. If violate it will send "Invalid Mandatory and creating ticket is not succuess.  

            {
               "error": "Invalid Mandatory"
            }

## 2. API Update Ticket 
 **Path: '/update-ticket' using POST method.**

#### This api receive ticket information to update ticket column. To update ticket info send JSON boy that hvae attributes such as *"ticketStatus" , "ticketTitle" , "ticketDescription" , "ticketContactInfo"* by sending JSON into body.

1. To update ticket info by using this api it's required "ticketId" . It will receive from "/create-ticket " as primary key of ticket table. If there's no "ticketId" this api will response error "Invalid Mandatory"  

2. If update ticket status makes sure that status strings are correct. There's only 4 types of status  - 1.pending , 2.accepted , 3. resolved , 4.rejected. If sending wrong status api will response error and the updating is not success example - 

    Sending 

        {
            "ticketId" : 4,
            "ticketStatus" : "foo",
            "ticketTitle" : "example",
            "ticketDescription" : "exampleDescripton2",
            "ticketContactInfo" : "ticketContactInfo3"
        }
            
    Return 


        {
            "status": "not success",
            "message": "This ticket status not exist",
            "data": {
                "ticketStatus": "doo"
            }
        }

## 3. API Get list and sort tickets 
 **Path: '/get-ticket-all' using POST method.**

** This api freestyle to **

<span style="background-color:black" >some *blue* text</span>.