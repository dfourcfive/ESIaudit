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
const etudiant=db.etudiant;
const etudiant_niveau=db.etudiant_niveau;
const enseignant=db.enseignant;
const outil_salle=db.outil_salle;

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
    var salles= ['Salle TP','Salle TD','Amphi','bureau','autres'];
    var choosen='Salle TP';
    departement.findAll().then((data)=>{
        var index=0;
        for(let j=0; j<data.length ; j++){
            for(let i=0; i<300; i++){
                if(i<120){
                    choosen='Salle TP';
                }else if (i>=120 && i<210){
                    choosen='Salle TD';
                }else if(i=>210 && i>240){
                    choosen='Amphi';
                }else if(i=>240 && i>280){
                    choosen='bureau';
                }else{
                    choosen='autres';
                }
                let descName = choosen +' '+faker.random.number({max:100});
                if(choosen=='Salle TP'){
                    var cp = Math.random() < 0.5 ? 25 : 35;
                }else if(choosen=='Salle TD'){
                    var cp = Math.random() < 0.5 ? 30 : 40; 
                }else if(choosen=='Amphi'){
                    var rand=Math.random();
                    if(rand<0.5){
                        var cp = 200;
                    }else if(rand < 0.75){
                        var cp = 300;
                    }else{
                        var cp = 400;
                    }
                }else if(choosen=='bureau'){
                    var rand=Math.random();
                    if(rand<0.5){
                        var cp = 3;
                    }else if(rand < 0.75){
                        var cp = 4;
                    }else{
                        var cp = 5;
                    }
                }else{
                    var rand=Math.random();
                    if(rand<0.5){
                        var cp = 5;
                    }else if(rand < 0.75){
                        var cp = 25;
                    }else{
                        var cp = 50;
                    }
                }
                salle.create({
                    nom: descName,
                    type: choosen,
                    capacite:cp,
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
    var Meubles = ["chaise","bureau","table","grande table","table d'ordinateur"];
    var Électronique=["datashow","serveur","PC","imprimante"];
    var Autres=["tableau","rideau datashow","poubelle"];
    var types=["Meubles","Électronique","Autres"];
    for(let i=0; i<types.length; i++){
        if(types[i]=='Meubles'){
            var arr=Meubles;
        }else if(types[i]=='Autres'){
            var arr=Autres;
        }else{
            var arr=Électronique;
        }
        for(let j=0;j<arr.length;j++){
        outil.create({
            titre: arr[j],
            type: types[i],
        }).then((result) => {
            console.log({result});
        });
        }
    };  
}
//fake link  salles with outils  
exports.FakeLinkSalleWithOutils=()=>{
    var salles = await salle.findAll();
    var outils = await outil.findAll();
        for(let i=0;i<salles.length;i++){
            for(let j=0;j<outils.length;j++){
            if(salles[i].get("type")=='Salle TD'){
                var cp=salles[i].get("capacite");
                if(outils[j].get("titre")=='table'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:cp
                    });
                }else if(outils[j].get("titre")=='chaise'){
                    cp=cp*2+1;
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:cp
                    });
                }else if(outils[j].get("titre")=='bureau'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    });
                }else if(outils[j].get("titre")=='tableau'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    });
                }
            }else if(salles[i].get("type")=='Salle TP'){
                var cp=salles[i].get("capacite");
                if(outils[j].get("titre")="table d'ordinateur"){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:cp
                    });
                }else if(outils[j].get("titre")=='PC'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:cp
                    });
                }else if(outils[j].get("titre")=='datashow'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    });
                }else if(outils[j].get("titre")=='rideau datashow'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    });
                }else if(outils[j].get("titre")=='chaise'){
                    cp=cp+1;
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:cp
                    });
                }
            }else if(salles[i].get("type")=='Amphi'){
                var cp=salles[i].get("capacite");
                if(outils[j].get("titre")="bureau"){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    });
                }else if(outils[j].get("titre")=='chaise'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:2
                    });
                }else if(outils[j].get("titre")=='datashow'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    });
                }else if(outils[j].get("titre")=='rideau datashow'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    });
                }
            }
         }
        }
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
                if(j % 2 ==0){
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
//fake etudiants
exports.FakeEtudiants=()=>{
    var index=0;
    var range = 0;
    for(let j=0; j<1000; j++){
           if(range <5){
            let dob=faker.date.between('1997-01-01','2003-01-01');
            let place = faker.address.cityName();
            let addr= faker.address.streetAddress();
            var sex;
            var gender;
            if(j % 2 ==0){
                sex='Homme';
                gender=0;
            }else{
                sex='Femme';
                gender=1;
            }
            let nom = faker.name.firstName({gender:gender});
            let prenom = faker.name.lastName({gender:gender});

            etudiant.create({
                nom: nom,
                prenom:prenom,
                sex:sex,
                date_naissance:dob,
                lieu_de_nissance:place,
                adresse:addr,
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
}
exports.FakeLinkManyToManyEtudNiv=()=>{
    niveaux.findAll().then((data)=>{
            etudiant.findAll().then((dataa)=>{
                for(let j=0; j<dataa.length ; j++){
                    if(j==1){
                        etudiant_niveau.create({
                            etudiantId:999,
                            niveauId:999
                        }).then((result) => {
                            console.log(result);
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                    formation_partenaire.create({
                        etudiantId: data[j].get("etudiantId"),
                        niveauId: dataa[j].get("niveauId")
                    }).then((result)=>{console.log({result})}).catch((e)=>{console.log(e)});
                }
            })     
    })
}
//fake teachers
exports.FakeEnseignant=()=>{
    var index=0;
    var range = 0;
    var situationSocial=['Célibataire','Marié','Divorcé','Veuf'];
    var grade =['MCA', 'MCB','MAA','MAB'];
    var specialite = ['Informatique','Mathematique','electronique','Langues'];
    var diplome =['Doctorat','Professeur'];
    for(let j=0; j<200; j++){
           if(range <5){
            let dob=faker.date.between('1970-01-01','1995-01-01');
            let place = faker.address.cityName();
            let addr= faker.address.streetAddress();
            var sex;
            var gender;
            if(j % 2 ==0){
                sex='Homme';
                gender=0;
            }else{
                sex='Femme';
                gender=1;
            }
            if(j<100){
                var spec= specialite[0];
            }else if(j>=130 && j<180){
                var spec = specialite[1];
            }else{
                var spec = specialite[2];
            }
            let nom = faker.name.firstName({gender:gender});
            let prenom = faker.name.lastName({gender:gender});
            enseignant.create({
                nom: nom,
                prenom:prenom,
                Sex:sex,
                situationSocial:situationSocial[j % 4],
                data_naissance:dob,
                grade:grade[j % 4],
                diplome:diplome[j % 2],
                specialite:spec,
                lieu_naissance:place,
                adresse:addr,
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
}