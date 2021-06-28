const BI_db = require('./BI_db_handler.js');
var Sequelize = require('sequelize');

exports.GetFactTables=()=>{
    BI_db.sequelize.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';",{type: Sequelize.QueryTypes.SELECT}).
    then((result) => {
        var tables=[];
        const arr = Array.from(result);
        arr.forEach(element => {
            tables.push(element[0]);
        });
        return tables;
    }).catch((err) => {
        console.log(err);
});
}

exports.GetFactTableFields=(table_name)=>{
    BI_db.sequelize.query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = 'public' AND  TABLE_NAME = '"+table_name+ "';").then((result)=>{
        const arr = Array.from(result[0]);
        var fields=new Map();
        var object = {};

        console.log(arr.length);
        fields.set('table',table_name);
        for(let i=0;i<arr.length;i++){
            console.log(arr[i]['column_name'],"="+arr[i]['data_type']);
            fields.set(arr[i]['column_name'],arr[i]['data_type']);
           // fields[arr[i]['column_name']]=arr[i]['data_type']
        }
        fields.forEach((value, key) => {
            var keys = key.split('.'),
                last = keys.pop();
            keys.reduce((r, a) => r[a] = r[a] || {}, object)[last] = value;
        });
        console.log(object);


    }).catch((err)=>{
        console.log({err});
    })
}


