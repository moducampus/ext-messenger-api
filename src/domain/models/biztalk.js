exports.insertMessage = (connection, data) => new Promise((resolve, reject) => {
  const statementData = [
    data.TITLE,
    data.BODY_MESSAGE,
    data.SENDER_NUMBER,
    '1',
    data.RECEIVER_NUMBER,
    data.MESSAGE_TYPE,
    data.SENDER_KEY,
    data.TEMPLATE_CODE,
  ]
  const sqlQuery = `
    INSERT INTO
      ata_mmt_tran (
        date_client_req,
        subject,
        content,
        callback,
        msg_status,
        recipient_num,
        msg_type,
        sender_key,
        template_code
      )
    VALUE (
      sysdate(),
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )
  `
  const connectionResult = connection.query(sqlQuery, statementData, (err, result) => {
    if(err) {
      err.executedQuery = connectionResult.query
      reject(err)
    }
    resolve(result)
  })
})