

const checkMandatory = (req, res ,next) => {
    const url = req.url
    const mandatoryReq = {
      "/get-ticket-all" : [],
      "/update-ticket"  : ["ticketId"],
      "/create-ticket"  : ["ticketTitle"],
    };

    if(url !== "/get-ticket-all") {
        const keyReq = Object.keys(req.body);
        const keyMandatory = Object.values(mandatoryReq[url]);
        let tmpArrayMandatory = [];
        keyReq.map((val) => {
          let result = keyMandatory.filter((item) => item == val);
          if(result.length !== 0)tmpArrayMandatory.push(result);
        });
        if (tmpArrayMandatory.length !== keyMandatory.length) {
          res.status(403).send({
            message: "Invalid Mandatory",
          });
        } else {
           next()
        }
    } else {
        next()
    }
}

module.exports = checkMandatory