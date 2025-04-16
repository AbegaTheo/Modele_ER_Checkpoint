CREATE TABLE [Gym] {
  [gym_id] integer PRIMARY KEY,
  [nom] varchar(100),
  [adresse] varchar(200),
  [telephone] varchar(20)
}
GO

CREATE TABLE [Member] {
  [member_id] integer PRIMARY KEY,
  [nom] varchar(50),
  [prenom] varchar(50),
  [adresse] varchar(200),
  [date_naissance] date,
  [sexe] varchar(10),
  [gym_id] integer
}
GO

CREATE TABLE [Coach] (
  [coach_id] integer PRIMARY KEY,
  [nom] varchar(50),
  [prenom] varchar(50),
  [age] integer,
  [specialite] varchar(100)
)
GO

CREATE TABLE [Seances] (
  [seance_id] integer PRIMARY KEY,
  [type_sport] varchar(100),
  [horaire] datetime,
  [capacite_max] integer DEFAULT (20),
  [gym_id] integer
)
GO

CREATE TABLE [coach_seance] (
  [coach_id] integer,
  [seance_id] integer
)
GO

CREATE TABLE [inscriptions] (
  [inscription_id] integer PRIMARY KEY,
  [membre_id] integer,
  [seance_id] integer,
  [date_inscription] datetime DEFAULT (now())
)
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Homme, Femme, Autre',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'membres',
@level2type = N'Column', @level2name = 'sexe';
GO

ALTER TABLE [membres] ADD FOREIGN KEY ([gym_id]) REFERENCES [gymnases] ([gym_id])
GO

ALTER TABLE [seances] ADD FOREIGN KEY ([gym_id]) REFERENCES [gymnases] ([gym_id])
GO

ALTER TABLE [inscriptions] ADD FOREIGN KEY ([membre_id]) REFERENCES [membres] ([membre_id])
GO

ALTER TABLE [inscriptions] ADD FOREIGN KEY ([seance_id]) REFERENCES [seances] ([seance_id])
GO

ALTER TABLE [coach_seance] ADD FOREIGN KEY ([coach_id]) REFERENCES [coachs] ([coach_id])
GO

ALTER TABLE [coach_seance] ADD FOREIGN KEY ([seance_id]) REFERENCES [seances] ([seance_id])
GO
