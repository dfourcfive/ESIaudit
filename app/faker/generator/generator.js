const faker= require('faker');
const { formation } = require('../../models');
const db = require("../../models");
var departement = db.departement;
const salle = db.salle;
const club = db.club;
const activite = db.activite;
const outil = db.outil;
const administratif=db.administratif;
const partenaire = db.partenaire;
const niveaux = db.niveau;
const formation_partenaire =db.formation_partenaire;
const these=db.these;
const doctorant=db.doctorant;

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
    var salles= ['Salle TP','Salle TD','Amphi','Salle club']
    var capacities=[25,30,100,30];
    departement.findAll().then((data)=>{
        var index=0;
        for(let j=0; j<data.length ; j++){
            for(let i=0; i<40; i++){
                let desc = faker.lorem.word();              
                salle.create({
                    nom: salles[index],
                    type:desc,
                    capacite:capacities[index],
                    departementDepartementId: data[j].get("departementId")
                }).then((result) => {
                    console.log({data});
                });
                if(index>=4){
                    index=0;
                   }else{
                       index++;
                }
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
//fake outils  
exports.FakeOutils=()=>{
    salle.findAll().then((data)=>{
        for(let j=0; j<data.length ; j++){
            for(let i=0; i<3; i++){
                let name = faker.lorem.word();
                var type;
                if(i % 3 == 0){
                     type = 'Électronique';
                }else if(i % 3 ==1){
                     type = 'meubles';
                }else{
                     type = 'autre';
                }
                outil.create({
                    titre: name,
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
//fake administratifs
exports.FakeAdministratifs=()=>{
    departement.findAll().then((data)=>{
        for(let j=0; j<data.length ; j++){
            for(let i=0; i<5; i++){
                var sex;
                var gender;
                if(i % 2 ==0){
                    sex='Homme';
                    gender=0;
                }else{
                    sex='Femme';
                    gender=1;
                }
                var diplome;
                var role;
                var specialite;
                let date_birth=faker.date.between('1980-01-01','1995-01-01');
                let place_birth=faker.address.cityName();
                let addresse=faker.address.streetAddress();
                if(i % 5 == 0){
                    diplome = 'sans diplôme';
                    role = 'agents de sécurité';
                    specialite='sécurité';
               }else if(i % 5 ==1){
                diplome = 'TS';
                role = 'ouvrier';
                specialite='autres';
                }else if(i % 5 ==2){
                    diplome = 'Licence';
                    role = 'administratif';
                    specialite='économie';
                }    else if(i % 5 ==3){
                    diplome = 'Master';
                    role = 'administratif';
                    specialite='informatique';
                }   else if(i % 5 ==4){
                    diplome = 'Licence';
                    role = 'ouvrier';
                    specialite='informatique';
                }              
                let nom = faker.name.firstName({gender:gender});
                let prenom = faker.name.lastName({gender:gender});
                let desc= faker.lorem.words();
                var type;
                if(i % 3 == 0){
                     type = 'Électronique';
                }else if(i % 3 ==1){
                     type = 'meubles';
                }else{
                     type = 'autre';
                }
                administratif.create({
                    nom: nom,
                    prenom: prenom,
                    type:desc,
                    diplome:diplome,
                    specialite:specialite,
                    role:role,
                    sex:sex,
                    data_de_naissance:date_birth,
                    lieu_naissance:place_birth,
                    adresse:addresse,
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
//fake formations
exports.FakeFormations=()=>{
    departement.findAll().then((data)=>{
        for(let j=0; j<data.length ; j++){
            for(let i=0; i<10; i++){
                let name;
                if(i % 4 == 0){
                    name='SIW';
                }else if(i % 4 ==1){
                    name='ISI';
                }else if(i % 4 == 2){
                    name='SIQ';
                }else{
                    name='SIT';
                }
                let desc = faker.lorem.paragraph(1);
                formation.create({
                    nom: name,
                    description:desc,
                    departementDepartementId: data[j].get("departementId")
                }).then((result) => {
                    console.log({result});
                });
            }}
        //
    }).catch((err)=>{
        console.log({err});
    });
    
}
//fake pertenaires
exports.FakePartenaires=()=>{
    formation.findAll().then((data)=>{
        for(let j=0; j<data.length-3 ; j++){
            for(let i=0; i<10; i++){
                let name = faker.company.companyName();
                let desc = faker.lorem.words();
                partenaire.create({
                    Nom: name,
                    type:desc,
                }).then((p)=>{  
                        console.log({p});    
                });
            }}
        //
    }).catch((err)=>{
        console.log({err});
    });
}
exports.FakeLinkManyToManyFormatParte=()=>{
    formation.findAll().then((data)=>{
            partenaire.findAll().then((dataa)=>{
                for(let j=0; j<dataa.length ; j++){
                    if(j==1){
                        formation_partenaire.create({
                            formationId:999,
                            partenaireId:999
                        }).then((result) => {
                            console.log(result);
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                    formation_partenaire.create({
                        formationId: data[j].get("formationId"),
                        partenaireId: dataa[j].get("partenaireId")
                    }).then((result)=>{console.log({result})}).catch((e)=>{console.log(e)});
                }
            })     
    })
}
//fake niveaux
exports.FakeNiveaux=()=>{
    formation.findAll().then((data)=>{
        var index=0;
        var names=['1 CPI','2 CPI','1 CS','2 CS','3 CS'];
        for(let j=0; j<data.length; j++){
                let desc = faker.lorem.words();
                niveaux.create({
                    nom: names[index],
                    desc:desc,
                    Durée:12,
                    formationFormationId:data[j].get("formationId")
                }).then((data)=>{  
                    console.log({data});       
                });
                if(index>=4){
                    index=0;
                }else{
                    index++;
                }
            }
        //
    }).catch((err)=>{
        console.log({err});
    });
    
}
//fake these
exports.FakeTheses=()=>{
    departement.findAll().then((data)=>{
        var index=0;
        var range = 0;
        var names=['informatique','electronique','economie','biologie','3 CS'];
        for(let j=0; j<data.length; j++){
               if(range <5){
                let desc = faker.lorem.words();
                let titre = faker.lorem.word();
                let date_debut=faker.date.between('2016-01-01','2017-01-01');
                let date_fin=addDays(date_debut,1460);                         
                these.create({
                    domaine: names[index],
                    titre:titre,
                    desc:desc,
                    Durée:12,
                    date_Lancement:date_debut,
                    date_Fin:date_fin,
                    departementDepartementId:data[j].get("departementId")
                }).then((data)=>{  
                    console.log({data});       
                });
                if(index>=4){
                    index=0;
                }else{
                    index++;
                }
                range++;
               }
               else{
                   range=0;
               }
            }
        //
    }).catch((err)=>{
        console.log({err});
    });
    
}
//fake these
exports.FakeDoctorants=()=>{
    departement.findAll().then((data)=>{
        var index=0;
        var range = 0;
        for(let j=0; j<data.length; j++){
               if(range <5){
                let dob=faker.date.between('1960-01-01','1980-01-01');
                let place = faker.address.cityName();
                let addr= faker.address.streetAddress();
                var sex;
                var gender;
                if(i % 2 ==0){
                    sex='Homme';
                    gender=0;
                }else{
                    sex='Femme';
                    gender=1;
                }
                let nom = faker.name.firstName({gender:gender});
                let prenom = faker.name.lastName({gender:gender});

                doctorant.create({
                    nom: nom,
                    prenom:prenom,
                    sex:sex,
                    date_naissance:dob,
                    lieu_de_nissance:place,
                    adresse:addr,
                    departementDepartementId:data[j].get("departementId")
                }).then((data)=>{  
                    console.log({data});       
                });
                if(index>=4){
                    index=0;
                }else{
                    index++;
                }
                range++;
               }
               else{
                   range=0;
               }
            }
        //
    }).catch((err)=>{
        console.log({err});
    });
    
}