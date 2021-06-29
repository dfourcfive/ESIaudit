const bi_data_provider = require("../../BI/bi_data_provider");

exports.getTablesData=async (req, res) => {
     bi_data_provider.GetBIFactTablesData().then((value)=>{
         res.send({value});
     }).catch((err)=>{
        res.status(500).send({ message: err.message });
     });
}

