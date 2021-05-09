CREATE DATABASE auditDB;

CREATE TABLE IF NOT EXISTS Salles(
    id_sal SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    type VARCHAR(255),
    capacite INT,
    id_dep INT,
    CONSTRAINT fk_id_dep
      FOREIGN KEY(id_dep) 
	      REFERENCES departements(id_dep)
	      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Activités(
    id_act SERIAL PRIMARY KEY,
    titre VARCHAR(255),
    type VARCHAR(255),
    date_debut DATE,
    date_fin DATE,
    id_club INT,
    CONSTRAINT fk_id_club
      FOREIGN KEY(id_club) 
	      REFERENCES Clubs(id_club)
	      ON DELETE SET NULL,    
    id_sal INT,
    CONSTRAINT fk_id_sal
      FOREIGN KEY(id_sal) 
	      REFERENCES Salles(id_sal)
	      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Outils(
    id_out SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    type VARCHAR(255),
    id_sal INT,
    CONSTRAINT fk_id_sal
      FOREIGN KEY(id_sal) 
	      REFERENCES Salles(id_sal)
	      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Clubs(
    id_club SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    type VARCHAR(255),
    date_creation DATE,
    id_sal INT,
    CONSTRAINT fk_id_sal
      FOREIGN KEY(id_sal) 
	      REFERENCES Salles(id_sal)
	      ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS Theses(
    id_these SERIAL PRIMARY KEY,
    titre VARCHAR(255),
    domaine VARCHAR(255),
    date_Lancement DATE,
    id_dep INT,
    CONSTRAINT fk_id_dep
      FOREIGN KEY(id_dep) 
	      REFERENCES departements(id_dep)
	      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS departements(
    id_dep SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS doctorants(
    id_doc SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    date_naissance DATE,
    lieu_nissance VARCHAR(255),
    adresse VARCHAR(255),
    sex VARCHAR(100),
    id_dep INT,
    CONSTRAINT fk_id_dep
      FOREIGN KEY(id_dep) 
	      REFERENCES departements(id_dep)
	      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS formations(
    id_form SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    description VARCHAR(255),
    id_dep INT,
    CONSTRAINT fk_id_dep
      FOREIGN KEY(id_dep) 
	      REFERENCES departements(id_dep)
	      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS administratifs(
    id_adm SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    data_naissance DATE,
    lieu_naissance VARCHAR(255),
    adresse VARCHAR(255),
    diplome VARCHAR(255),
    specialite VARCHAR(255),
    role VARCHAR(255),
    sex VARCHAR(100),
    id_dep INT,
     CONSTRAINT fk_id_dep
      FOREIGN KEY(id_dep) 
	      REFERENCES departements(id_dep)
	      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS PfeMaster (
    id_pfem SERIAL PRIMARY KEY,
    titre VARCHAR(255),
    domain VARCHAR(255),
    date_Lancement DATE,
    date_fin DATE,
    id_form INT,
     CONSTRAINT fk_id_form
      FOREIGN KEY(id_form) 
	    REFERENCES formations(id_form)
	      ON DELETE SET NULL,
    id_ens
    CONSTRAINT fk_id_ens
      FOREIGN KEY(id_ens) 
	      REFERENCES enseignants(id_ens)
	      ON DELETE SET NULL,
);


CREATE TABLE IF NOT EXISTS etudiants(
    id_etud SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    data_naissance DATE,
    lieu_naissance VARCHAR(255),
    adresse VARCHAR(255),
    Sex VARCHAR(100),
    id_niv INT,
     CONSTRAINT fk_id_niv
      FOREIGN KEY(id_niv) 
	      REFERENCES niveaux(id_niv)
	      ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS enseignants(
    id_ens SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    data_naissance DATE,
    lieu_nissance VARCHAR(255),
    adresse VARCHAR(255),
    diplome VARCHAR(255),
    specialite VARCHAR(255),
    grade VARCHAR(255),
    situationSocial VARCHAR(255),
    Sex VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS enseignants_formations(
    id_ens INT PRIMARY KEY,
     CONSTRAINT fk_id_ens
      FOREIGN KEY(id_ens) 
	      REFERENCES enseignants(id_form)
	      ON DELETE SET NULL,
    id_form INT PRIMARY KEY,
     CONSTRAINT fk_id_form
      FOREIGN KEY(id_form) 
	      REFERENCES formations(id_form)
	      ON DELETE SET NULL,
);

CREATE TABLE IF NOT EXISTS niveaux(
    id_niv SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    description VARCHAR(255),
    Durée INT,
    id_form INT,
     CONSTRAINT fk_id_form
      FOREIGN KEY(id_form) 
	      REFERENCES formations(id_form)
	      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS DelibNiveau(
    id_db SERIAL PRIMARY KEY,
    id_niv INT,
     CONSTRAINT fk_id_niv
      FOREIGN KEY(id_niv) 
	      REFERENCES niveaux(id_niv)
	      ON DELETE SET NULL,
    id_etud INT,
     CONSTRAINT fk_id_etud
      FOREIGN KEY(id_etud) 
	      REFERENCES etudiants(id_etud)
	      ON DELETE SET NULL,
    année VARCHAR(8),
    MoyenneS1 NUMERIC(6,2),
    MoyenneS2 NUMERIC(6,2),
    CreditS1 INT,
    CreditS2 INT,
    Observation VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS Semestres(
    id_sem SERIAL PRIMARY KEY,
    id_niv INT,
      CONSTRAINT fk_id_niv
        FOREIGN KEY(id_niv) 
	      REFERENCES niveaux(id_niv)
	      ON DELETE SET NULL,  
    numero INT,
    description TEXT,
);

CREATE TABLE IF NOT EXISTS UE(
    id_ue SERIAL PRIMARY KEY,
    id_sem INT,
       CONSTRAINT fk_id_sem
        FOREIGN KEY(id_sem) 
	      REFERENCES Semestres(id_sem)
	      ON DELETE SET NULL,    
    nom VARCHAR(50),
    description VARCHAR(255),
    type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Matieres(
    id_mat SERIAL PRIMARY KEY,
    id_ue INT,
       CONSTRAINT fk_id_ue
        FOREIGN KEY(id_ue) 
	      REFERENCES UE(id_ue)
	      ON DELETE SET NULL,
    nom VARCHAR(50),
    type VARCHAR(30),
    Coefficient INT,
    Credit INT,
    ChargeHoraire INT,   
);
CREATE TABLE IF NOT EXISTS Seances(
    id_sea SERIAL PRIMARY KEY,
    id_mat INT,
       CONSTRAINT fk_id_mat
        FOREIGN KEY(id_mat) 
	      REFERENCES Matieres(id_mat)
	      ON DELETE SET NULL,  
    charge_horaire INT,
    type VARCHAR(255),  
);
CREATE TABLE IF NOT EXISTS Enseignement(
    id_ensm SERIAL PRIMARY KEY,
    id_sea INT,
       CONSTRAINT fk_id_sea
        FOREIGN KEY(id_sea) 
	      REFERENCES Seances(id_sea)
	      ON DELETE SET NULL,
    charge_horaire INT,
    role VARCHAR(255),        
);

CREATE TABLE IF NOT EXISTS DelibModule(
    id_dbm SERIAL PRIMARY KEY,
    id_mat INT,
       CONSTRAINT fk_id_mat
        FOREIGN KEY(id_mat) 
	      REFERENCES Matieres(id_mat)
	      ON DELETE SET NULL,
    id_etud INT,
     CONSTRAINT fk_id_etud
      FOREIGN KEY(id_etud) 
	      REFERENCES etudiants(id_etud)
	      ON DELETE SET NULL,
    anneés INT,
    moyenne NUMERIC(6,2),
);

CREATE TABLE IF NOT EXISTS Partenaire(
    id_par SERIAL PRIMARY KEY,
    id_form INT,
       CONSTRAINT fk_id_form
        FOREIGN KEY(id_form) 
	      REFERENCES formations(id_form)
	      ON DELETE SET NULL,
    type VARCHAR(255),
    role VARCHAR(255),        
);