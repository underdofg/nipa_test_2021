class UpdateTicket  {
    constructor(params) {
        if(params.ticketTitle) this.ticket_title = params.ticketTitle ;
        if(params.ticketDescription) this.ticket_description = params.ticketDescription ;
        if(params.ticketContactInfo) this.ticket_contact_information = params.ticketContactInfo ;
        if(params.status) this.ticket_status = params.status ;
        this.ticket_update_at = new Date();
    }
}

module.exports = UpdateTicket;