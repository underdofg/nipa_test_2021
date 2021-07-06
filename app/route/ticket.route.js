const controller = require('../controller/ticket.controller');

module.exports = (app) => {
  app.route(`/create-ticket`).post(controller.creatTicket);
  app.route(`/update-ticket`).post(controller.updateTicketStatus);
  app.route(`/get-ticket-all`).post(controller.getTicket);
  // 1. edited user's data
};

