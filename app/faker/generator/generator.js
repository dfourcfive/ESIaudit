const faker= require('faker');
const db = require("../../models");
const departement = db.departement;
const salle = db.salle;
const club = db.club;
const activite = db.activite;

exports.FakeDepartement=()=>{
    faker.seed(100);
    for(let i=0; i<100; i++){
        let name = faker.lorem.word();
        let desc = faker.lorem.paragraph(1);
        departement.create({
            nom: name,
            description:desc,
        }).then((data) => {
            console.log({data});
        }).catch((err) => {
            console.log({ message: err.message });
        });
    }
}

exports.FakeSalles=()=>{
    departement.findAll().then((data)=>{
        for(let j=0; j<data.length ; j++){
            for(let i=0; i<10; i++){
                let name = faker.lorem.word();
                let desc = faker.lorem.word();
                salle.create({
                    nom: name,
                    type:desc,
                    capacite:number,
                    departementDepartementId: data[j].get("departementId")
                }).then((result) => {
                    console.log({data});
                });
            }}
        //
    }).catch((err)=>{
        console.log({err});
    });
    
}
exports.FakeClubes=()=>{
    salle.findAll().then((data)=>{
        for(let j=0; j<data.length ; j++){
            for(let i=0; i<3; i++){
                let name = faker.lorem.word();
                var type;
                if(i % 3 == 0){
                     type = 'scientifique';
                }else if(i % 3 ==1){
                     type = 'culturel';
                }else{
                     type = 'autre';
                }
                club.create({
                    nom: name,
                    type: type,
                    salleSalleId: data[j].get("salleId")
                }).then((result) => {
                    console.log({data});
                });
            }}
        //
    }).catch((err)=>{
        console.log({err});
    });
    
}
exports.FakeActivities=()=>{
    club.findAll().then((result)=>{
        salle.findAll().then((data)=>{
            for(let j=0; j<data.length ; j++){
                for(let i=0; i<3; i++){
                    let name = faker.lorem.word();
                    let date_debut=faker.date.between('2020-01-01','2022-01-01');
                    console.log(date_debut.toISOString);
                    var date_fin =new Date();
                    var type;
                    if(i % 3 == 0){
                         type = 'scientifique';
                         date_fin=addDays(date_debut,3);                         
                        }else if(i % 3 ==1){
                         type = 'culturel';
                         date_fin=addDays(date_debut,2);               
                    }else{
                         type = 'autre';
                         date_fin=addDays(date_debut,1);
                        }
                    activite.create({
                        titre: name,
                        type: type,
                        date_debut: date_debut,
                        date_fin: date_fin,
                        salleSalleId: data[j].get("salleId"),
                        clubClubId: result[j].get("clubId")
                    }).then((err) => {
                        console.log({err});
                    });
                }}
            //
        }).catch((err)=>{
            console.log({err});
        });
    }).catch((err)=>{
        console.log({err});
    })
    
}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  