

const checkMandatory = (req, res ,next) => {
    const url = req.url
    const mandatoryReq = {
      "/get-ticket-all" : [],
      "/update-ticket"  : ["ticketId"],
      "/create-ticket"  : ["ticketTitle"],
    };
    const ticketTable = [
      "ticketId",
      "ticketStatus",
      "ticketContactInfo",
      "ticketTitle",
      "ticketDescription",
    ];
    const acceptURL = Object.keys(mandatoryReq);
    const isURL = acceptURL.indexOf(url) !== -1 ? true : false ; 

    if (url !== "/get-ticket-all" && isURL === true) {
      const keyReq = Object.keys(req.body);
      const keyMandatory = Object.values(mandatoryReq[url]);
      let tmpArrayMandatory = [];
      let alienArray = [];
      keyReq.map((val) => {
        let result = keyMandatory.filter((itemManda) => val == itemManda);
        if (result.length !== 0) tmpArrayMandatory.push(result);
      });

      keyReq.map((val) => {
        let aliene = ticketTable.indexOf(val);
        if (aliene == -1) alienArray.push(val);
      });
      if (
        tmpArrayMandatory.length !== keyMandatory.length ||
        alienArray.length > 0
      ) {
        res.status(400).send({
          error: "Invalid Mandatory",
        });
      } else {
        next();
      }
    } else {
      next();
    }
}

module.exports = checkMandatory