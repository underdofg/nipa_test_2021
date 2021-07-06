const { db } = require("../../db")
const ValidateError = require("../statusResponse/ValidationError")
const TicketCreator = require( "../model/createTicket")
const UpdateTicket = require("../model/updateTicket")

exports.creatTicket = async (req, res, next) => {
   const client = await db.connect();
  try {
    const ticketDetail = new TicketCreator(req.body);
    const ticketSqL = insertSQL(ticketDetail, "ticket");
    ticketSqL.sql += "RETURNING ticket_id";

    await client.query("BEGIN");
    const result = await client.query(ticketSqL.sql, ticketSqL.params);
    if(result.rowCount === 1) {
      res.json({
        status: 200,
        ticketTitle: ticketDetail.ticket_title,
        ticketId: result.rows[0].ticket_id,
      });
    } else {
      throw new ValidateError("can not create ticket", 500, ticketDetail.ticket_title);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  }
};

exports.updateTicketStatus = async (req, res, next) => {
   const client = await db.connect();
  try {
    let result;
    if (req.body.ticketStatus) {
      const statusId = await getTicketStatusId(req.body.ticketStatus ,res);
      if(statusId == null) throw new ValidateError("This ticket status not exist", 400, {
        ticketStatus: req.body.ticketStatus,
      });
      req.body.status = statusId;
    }
    const updateTicketDetail = new UpdateTicket(req.body);
    await client.query("BEGIN");
    const updateSqL = updateSql(req.body.ticketId, updateTicketDetail);
    result = await client.query(updateSqL.query, updateSqL.params);

    if (result && result.rowCount === 1) {
      res.json({
        status: 200,
        message: "Update success",
        informationUpdated: req.body,
      });

    } else {
      throw new ValidateError("Not have ticketId", 500, {
        ticketId: req.body.ticketId,
        ticketTitle: req.body.ticketTitle
      });
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  }
};


exports.getTicket = async (req, res, next) => {
  const { ticketStatus , sortByLastUpdate , sortBySatus} = req.body

  try {
    const client = await db.connect();
    let sql = `
    select
		  t.ticket_id ,
	    ticket_title,
	    ticket_description ,
	    ticket_contact_information ,
	    ts.ticket_status,
	    t.ticket_timestamp,
	    t.ticket_update_at
    from
	    ticket t
    left join ticket_status ts on t.ticket_status = ts.ticket_status_id
    where
	    1 = 1
	  ${ticketStatus ? "and ts.ticket_status like $1 " : ""} 
    ${sortByLastUpdate || sortBySatus ? "ORDER BY" : ""}
    ${sortByLastUpdate ? "ticket_update_at " : ""}
    ${sortBySatus ? ", ticket_status " : ""}`;
    
    let params = []
    params = ticketStatus ? params.concat(ticketStatus) : params ;
    const result = await client.query(sql, params);

    return res.json({
      success: 200,
      ticketlist: result.rows,
    });
  } catch (error) {
    next(error);
  }
};


const insertSQL = (colmun, table) => {
  let result = new Object();
  let sql = "";
  let params = [];
  let insertColumn = "";
  let insertValues = "";

  let i = 1;
  for (const key in colmun) {
    if (i !== 1) {
      params.push(colmun[key]);
      insertColumn += " ,";
      insertValues += " , ";
      insertValues += `$${i - 1}`;
    } else {
      insertValues += `nextval('ticket_ticket_id_seq')`;
    }
    insertColumn += key;
    i++;
  }
  sql = `INSERT INTO ${table} (${insertColumn}) VALUES (${insertValues})`;
  result.sql = sql;
  result.params = params;

  return result;
};

const updateSql =  (id, columns) => {
  let query = ["UPDATE ticket"];
  let params = []
  query.push("SET");
  let set = [];
  Object.keys(columns).forEach((key, i) => {
    set.push(key + " = ($" + (i + 1) + ")");
    params.push(columns[key]);
  });
  query.push(set.join(", "));
  query.push("WHERE ticket_id = " + id);
  
  return {
    query: query.join(' '),
    params: params,
  };
};


const getTicketStatusId = async (statusname ) => {
   const client = await db.connect();
   const resultId = await client.query(
      "SELECT ticket_status_id FROM ticket_status WHERE ticket_status = $1",
      [statusname]
    );
    if(resultId.rows.length !== 0) {
      return resultId.rows[0].ticket_status_id;
    } else {
      return null
    }

}