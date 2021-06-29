const bi_db_data = require('./bi_db_data');

exports.GetBIFactTablesData=async()=>{
    var result = [];
    var table_names =await bi_db_data.GetFactTables();
    for(let i=0 ;i<table_names.length;i++){
        var tmp = await bi_db_data.GetFactTableFields(table_names[i]);
        result.push(tmp);
    }
    return result;
}

