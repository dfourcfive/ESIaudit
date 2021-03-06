exports.queryToSql = (req) => {
  var sql = "SELECT ";
  var tables = Array.from(req["tables"]);
  var isRoleUp = req.isRoleUp;
  var isGroupBy = req.isGroupBy;
  var isCube = req.isCube;
  //transformations to
  var tables_names = [];
  var params_names = [];
  for (let i = 0; i < tables.length; i++) {
    tables_names.push(tables[i]["name"]);
    let arr_params = Array.from(tables[i]["params"]);
    for (let j = 0; j < arr_params.length; j++) {
      let tmp = tables_names[i];
      tmp = tmp + ".";
      tmp = tmp + arr_params[j];
      //
      params_names[j] = tmp;
      console.log(params_names[j]);
      //here append to sql params to select
      sql = sql + params_names[j] + " ";
    }
  }
  //append to sql from tables names
  sql = sql + " FROM ";
  for (let i = 0; i < tables_names.length; i++) {
    sql = sql + tables_names[i] + " ,";
  }
  //delete last ,
  sql = sql.substring(0, sql.length - 1);
  //params_names (to select) => t1.p1 , t2.p3 , t3.p2
  //table_names => tab1 t1, tab2 t2, tab3 t3

  //here handle groupBy
  sql = sql + " GROUP BY ";
  if (isGroupBy === true) {
    var GroupBy = Array.from(req.GroupBy);
    var GroupBy_result = [];
    for (let i = 0; i < GroupBy.length; i++) {
      var GroupBy_table = GroupBy[i]["name"];
      var GroupBy_params = Array.from(GroupBy[i]["params"]);
      for (let j = 0; j < GroupBy_params.length; j++) {
        GroupBy_result[j] = GroupBy_table + "." + GroupBy_params[j];
        sql = sql + GroupBy_result[j] + " ,";
      }
    }
    sql = sql.substring(0, sql.length - 1);
    sql = sql + ";";
  }

  //here handle  roleup
  if (isRoleUp === true) {
    sql = sql.substring(0, sql.length - 1);
    sql = sql + ", ROLLUP (";
    var RoleUp = Array.from(req.RollUp);
    var roleup_result = [];
    for (let i = 0; i < RoleUp.length; i++) {
      var roleup_table = RoleUp[i]["name"];
      var roleup_params = Array.from(RoleUp[i]["params"]);
      for (let j = 0; j < roleup_params.length; j++) {
        roleup_result[j] = roleup_table + "." + roleup_params[j];
        sql = sql + roleup_result[j] + " ,";
      }
    }
    sql = sql.substring(0, sql.length - 1);
    sql = sql + ");";
  }

  //here handle cube
  if (isCube === true) {
    sql = sql.substring(0, sql.length - 1);
    sql = sql + ", CUBE (";
    var Cube = Array.from(req.Cube);
    var cube_result = [];
    for (let i = 0; i < Cube.length; i++) {
      var cube_table = Cube[i]["name"];
      var cube_params = Array.from(Cube[i]["params"]);
      for (let j = 0; j < cube_params.length; j++) {
        cube_result[j] = cube_table + "." + cube_params[j];
        sql = sql + cube_result[j] + " ,";
      }
    }
    sql = sql.substring(0, sql.length - 1);
    sql = sql + ");";
  }
  console.log(sql);
  return sql;
};
