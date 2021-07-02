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
const ens_forma=db.enseignants_formation;
const outil_salle=db.outil_salle;
const semestre = db.semestre;
const PfeMaster = db.PfeMaster;
const etudiant_pfemaster = db.etudiant_pfemaster;
const cite = db.cite;
const ue=db.ue;
const etudiant_cite=db.etudiant_cite;
const matier = db.matiere;
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
            for(let i=0; i<200; i++){
                if(i<80){
                    choosen='Salle TP';
                }else if (i>=80 && i<120){
                    choosen='Salle TD';
                }else if(i<150 && i>=120){
                    choosen='Amphi';
                }else if(i<180 && i>=150){
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
exports.FakeLinkSalleWithOutils=async ()=>{
    let salles = await salle.findAll();
    let outils = await outil.findAll();
    console.log(salles.length);
    console.log(salles.length);

        for(let i=0;i<salles.length;i++){
            for(let j=0;j<outils.length;j++){
            if(salles[i].get("type")=='Salle TD')
            {
                var cp=salles[i].get("capacite");
                if(outils[j].get("titre")=='table'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:cp
                    }).then((data)=>console.log({data}));
                }else if(outils[j].get("titre")=='chaise'){
                    cp=cp*2+1;
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:cp
                    }).then((data)=>console.log({data}));
                }else if(outils[j].get("titre")=='bureau'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    }).then((data)=>console.log({data}));
                }else if(outils[j].get("titre")=='tableau'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    }).then((data)=>console.log({data})).catch((data)=>console.log({data}));
                }
            }else if(salles[i].get("type")=='Salle TP'){
                var cp=salles[i].get("capacite");
                if(outils[j].get("titre")=="table d'ordinateur"){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:cp
                    }).then((data)=>console.log({data})).catch((data)=>console.log({data}));
                }else if(outils[j].get("titre")=='PC'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:cp
                    }).then((data)=>console.log({data})).catch((data)=>console.log({data}));
                }else if(outils[j].get("titre")=='datashow'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    }).then((data)=>console.log({data})).catch((data)=>console.log({data}));
                }else if(outils[j].get("titre")=='rideau datashow'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    }).then((data)=>console.log({data})).catch((data)=>console.log({data}));
                }else if(outils[j].get("titre")=='chaise'){
                    cp=cp+1;
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:cp
                    }).then((data)=>console.log({data})).catch((data)=>console.log({data}));
                }
            }else if(salles[i].get("type")=='Amphi'){
                var cp=salles[i].get("capacite");
                if(outils[j].get("titre")=="bureau"){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quntity:1
                    }).then((data)=>console.log(data)).catch((data)=>console.log({data}));
                }else if(outils[j].get("titre")=='chaise'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:2
                    }).then((data)=>console.log(data)).catch((data)=>console.log({data}));
                }else if(outils[j].get("titre")=='datashow'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    }).then((data)=>console.log(data)).catch((data)=>console.log({data}));
                }else if(outils[j].get("titre")=='rideau datashow'){
                    outil_salle.create({
                        outilId:outils[j].get('outilId'),
                        salleId:salles[i].get('salleId'),
                        quantity:1
                    }).then((data)=>console.log(data)).catch((data)=>console.log({data}));
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
//fake doctorants
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
            var rndm=faker.datatype.number({'min':0,'max':5});
            var intern =['oui','no'];
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
                Sex:sex,
                data_naissance:dob,
                lieu_naissance:place,
                adresse:addr,
                intern:intern[rndm % 2]
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
                    etudiant_niveau.create({
                        etudiantId: dataa[j].get("etudiantId"),
                        niveauId: data[j].get("niveauId")
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
    for(let j=0; j<500; j++){
           if(range <5){
            var dob=faker.date.between('1970-01-01','1995-01-01');
            var place = faker.address.cityName();
            var addr= faker.address.streetAddress();
            var sex;
            var gender;
            if(j % 2 ==0){
                sex='Homme';
                gender=0;
            }else{
                sex='Femme';
                gender=1;
            }
            if(j<250){
                var spec= specialite[0];
            }else if(j>=250 && j<350){
                var spec = specialite[1];
            }else if(j>=350 && j<450){
                var spec = specialite[2];
            }else{
                var spec = specialite[3];
            }
            var nom = faker.name.firstName({gender:gender});
            var prenom = faker.name.lastName({gender:gender});
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
//fake link ens with formation
exports.FakeLinkEnsWithForma=async ()=>{
    var formations=await formation.findAll();
    var enss= await enseignant.findAll();
    var nb_info=0;
    var nb_math=0;
    var nb_elect=0;
    var nb_lang=0;
    for(let i=0; i<formations.length; i++){
        for(let j=0; j<enss.length; j++){
            if(enss[j].get("specialite")=="Informatique"){
                if(nb_info != 30){
                    ens_forma.create({
                        formationId:formations[i].get("formationId"),
                        enseignantId:enss[j].get("enseignantId")
                    });
                    nb_info=nb_info+1;
                }
            }else if(enss[j].get("specialite")=="Mathematique"){
                if(nb_math != 7){
                    ens_forma.create({
                        formationId:formations[i].get("formationId"),
                        enseignantId:enss[j].get("enseignantId")
                    });
                    nb_math=nb_math+1;
                }
            }else if(enss[j].get("specialite")=="electronique"){
                if(nb_elect != 4){
                    ens_forma.create({
                        formationId:formations[i].get("formationId"),
                        enseignantId:enss[j].get("enseignantId")
                    });
                    nb_elect=nb_elect+1;
                }
            } else if(enss[j].get("specialite")=="Langues"){
                if(nb_lang != 3){
                    ens_forma.create({
                        formationId:formations[i].get("formationId"),
                        enseignantId:enss[j].get("enseignantId")
                    });
                    nb_lang=nb_lang+1;
                }
            }
            if(nb_info==30 && nb_math==7 && nb_elect==4 && nb_lang==3){
                 nb_info=0;
                 nb_math=0;
                 nb_elect=0;
                 nb_lang=0; 
                break;
            }
        }
    }
    }
//fake semestres
exports.FakeSemestres=()=>{
    niveaux.findAll().then((data)=>{
        var nv=['semestre 1','semestre 2'];
        var desc = faker.lorem.paragraph(1);
        var desc2 = faker.lorem.paragraph(1);
        for(let i=0;i<data.length;i++){
            if(i%2==0){
                semestre.create({
                    numero: nv[i % 2],
                    desc:desc,
                    niveauxNiveauId:data[i].get("niveauId")
                }).then((data)=>{  
                    console.log({data});       
                });
                semestre.create({
                    numero:nv[(i+1) % 2],
                    desc:desc2,
                    niveauxNiveauId:data[i+1].get("niveauId")
                }).then((data)=>{  
                    console.log({data});       
                });
            }
        }
        //
    }).catch((err)=>{
        console.log({err});
    }); 
}
//todo generate fake link etudiant with pfeMaster
exports.FakePfeMaster=()=>{
    var types = ['Master','PFE'];
    var domain= ['réseau','web/mobile','big data','AI/ML','IOT'];
    var dates=['2016','2017','2018','2019','2020','2021'];
    etudiant.findAll().then((data)=>{
        for(let i=0;i<data.length;i++){
            var numb=faker.datatype.number({'max':2,min:'0'});
            var tt= faker.lorem.paragraph(1);
            var date_debut = faker.date.between(dates[i%6]+'-01-01',dates[i%6]+'-01-02');
            var date_fin = addDays(date_debut,185);
            PfeMaster.create({
                titre:tt,
                domain:domain[i % 4],
                type:types[numb % 2],
                date_Lancement:date_debut,
                date_fin:date_fin,
            }).then((data)=>{console.log({data})}).catch((err)=>{console.log({err})});
        }
    });
}
//todo generate fake link etudiant with pfeMaster
exports.FakeLinkEtudWithPfeMaster=async()=>{
    var etudiants = await etudiant.findAll();
    var pfeMasters = await PfeMaster.findAll();
    for(let i=0;i<etudiants.length;i++){
        if(i % 2 ==0){
            etudiant_pfemaster.create({
                etudiantId:etudiants[i].get('etudiantId'),
                PfeMasterId:pfeMasters[i].get('PfeMasterId')
            }).then((data)=>console.log({data})).catch((err)=>console.log({err}));
        }
    }
}

//fake Ues
exports.FakeUes=()=>{
    semestre.findAll().then((dataa)=>{
        var ues=['UEF 1','UEF 2','UEM 1','UET 1','UEF 3','UEF 4','UEM 2','UET 2','UEF 5','UEF 6','UEM 3','UEM 4','UET 3','UEF 7','UEF 8','UEM 5','UEM 6','UET 4','UEF 9','UEF 10','UEM 7','UET 5','UEM 8'];
        var use_length = ues.length;
        var chargeHoraire=[''];//54-200
        var index=0;
        for(let i=0; i<dataa.length ; i++){
        for(let j=0; j<4 ; j++){
            index=index+j;
            if(index >= use_length){
                index=0;
            }
            var confs = faker.datatype.number({
                'min': 5,
                'max': 30
            });
            var credit = confs;

            var chargeHoraire = faker.datatype.number({
                'min': 50,
                'max': 200
            });
            if(ues[index].includes("F")){
                var type="Fondamentales";
            }else if(ues[index].includes("M")){
                var type="Méthodologie";
            }else if(ues[index].includes("T")){
                var type="Transversale";
            }
            ue.create({
                nom: ues[index],
                Coefficient:confs,
                type:type,
                ChargeHoraire:chargeHoraire,
                credit:credit,
                semestreSemestreId: dataa[i].get('SemestreId')
            }).then((data)=>{
                console.log({data});       
            }).catch((err)=>console.log({err}));
        }
        index=index+4;
      }
            }).catch((err)=>console.log({err}));
        }

//fake cite
exports.FakeCite=()=>{
    for(let i=0;i<5;i++){
        let name = faker.random.word();
        let type =['Homme','Femme'];
        cite.create({
            nom:name,
            type:type[i % 2]
        }).then((result)=>{
            console.log({result});
        }).catch((err)=>console.log({err}));
    }
}

//fake link etudiant with cite
exports.FakeLinkEtudiantWithCite=()=>{
    etudiant.findAll().then((students)=>{
        cite.findAll().then((cites)=>{
            for(let i=0;i<students.length;i++){
                for(let j=3;j<cites.length;j++){
                    if(students[i].get('intern')=='oui'){
                        if(students[i].get('Sex')==cites[j].get('type')){
                            etudiant_cite.create({
                                etudiantId: students[i].get('etudiantId'),
                                citeId: cites[j].get('citeId')
                            });
                            break;
                        }
                    }
                }
            }
        });
    });
}
//fake matier
exports.FakeMatiers=()=>{
    ue.findAll().then((dataa)=>{
        for(let i=0; i<dataa.length ; i++){
            var nbr_matier_rand = faker.datatype.number({
                'min': 2,
                'max': 3
            });
        let confs_ue=dataa[i].get('Coefficient');
        let charge_ue=dataa[i].get('ChargeHoraire');
        let total_confs=0;
        let total_charge=0;
        for(let j=0; j<nbr_matier_rand ; j++){
            if(total_confs == confs_ue){
                break;
            }
            if(total_charge == charge_ue){
                break;
            }
            if(j==0){
                var confs=faker.datatype.number({
                    'min': 1,
                    'max': confs_ue
                });
                var charge_matier=faker.datatype.number({
                    'min': 20,
                    'max': confs_ue
                });
            }else if(j==nbr_matier_rand-1){
                var confs=confs_ue -total_confs;
                var charge_matier=charge_ue - total_charge;
            }else{
                var confs=faker.datatype.number({
                    'min': 1,
                    'max': confs_ue- total_confs
                });
                var charge_matier=faker.datatype.number({
                    'min': 20,
                    'max': total_charge - confs_ue
                });
            }           
            total_confs=total_confs + confs;
            total_charge=total_charge + charge_matier;
            let name = faker.lorem.word();
            matier.create({
                nom: name,
                Coefficient:confs,
                type:dataa[i].get('type'),
                ChargeHoraire:charge_matier,
                credit:confs,
                ueUeId: dataa[i].get('ueId')
            }).then((data)=>{
                console.log({data});       
            }).catch((err)=>console.log({err}));
            
        }
      }
            }).catch((err)=>console.log({err}));}