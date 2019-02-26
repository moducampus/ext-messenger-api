exports.insertMessage = (connection, data) => new Promise((resolve, reject) => {
  
  const statementData = [
    data.RECEIVER, 
    data.SENDER, 
    data.MESSAGE, 
    data.TITLE,
  ]

  const sqlQuery = `
    INSERT INTO 
      TBL_SUBMIT_QUEUE 
    VALUE (
      'null', 
      '1', 
      'planetory01', 
      '1', 
      '00', 
      'I', 
      CAST(DATE_FORMAT(now(),'%Y%m%d%H%m%s') AS CHAR), 
      '1', 
      ?, 
      ?, 
      '', 
      '00', 
      ?, 
      '', 
      0, 
      '', 
      '', 
      CAST(DATE_FORMAT(now(),'%Y%m%d%H%i%s') AS CHAR),
      '', 
      '', 
      '', 
      '', 
      '0', 
      '', 
      ?, 
      '02', 
      '', 
      '', 
      '', 
      '', 
      '', 
      '',
      0 ,
      0
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