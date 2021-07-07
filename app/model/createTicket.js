class TicketCreator  {
    constructor(params) {
        this.ticket_id  = '';
        this.ticket_title = params.ticketTitle;
        if(params.ticketDescription) this.ticket_description = params.ticketDescription;
        if(params.ticketContactInfo)this.ticket_contact_information = params.ticketContactInfo;
        this.ticket_status = 0;
        this.ticket_timestamp = new Date();
        this.ticket_update_at = new Date()
    }
}

module.exports = TicketCreator;