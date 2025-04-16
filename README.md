# Modele_ER_Checkpoint

## 🏋️‍♂️ Checkpoint : Diagramme Entité-Relation - Système de Gestion de Salle de Sport

--

## 📘 Description

Ce projet consiste à modéliser un système de gestion pour une chaîne de salles de sport.
Pour cela nous allons concevoir un **modèle Entité-Relation (ERD)** pour gérer efficacement la **chaîne de salles de sport**.  
L’objectif est de résoudre les problèmes de gestion manuelle rencontrés par le propriétaire en créant une structure de base de données claire, fiable et extensible. Il permet de structurer les informations sur les gymnases, les membres, les séances, et les coachs pour faciliter la gestion des inscriptions et des plannings via une base de données relationnelle.

---

## 📝 Cahier des charges

Le système de gestion de salle de sport doit prendre en compte les éléments suivants :

- Un propriétaire possède plusieurs gymnases (nom, adresse, numéro de téléphone).
- Les membres peuvent s'inscrire dans un gymnase (nom, prénom, adresse, date de naissance, sexe).
- Chaque séance est définie par un type de sport et un horaire, et accueille au maximum 20 membres.
- Chaque séance peut être animée par un ou deux coachs au maximum.
- Les coachs ont un nom, un prénom, un âge, et une spécialité.

---

## 📊 Entités principales

- **Gym** : Représente un gymnase (nom, adresse, téléphone)
- **Member** : Représente un membre (nom, prénom, adresse, date de naissance, sexe)
- **Coach** : Représente un coach (nom, prénom, âge, spécialité)
- **Session** : Représente une séance (type de sport, horaire, gymnase, nombre max de membres)

---

## 🔗 Relations entre les entités

| Relation | Type de relation | Description |
|---------|------------------|-------------|
| **Gym → Member** | 1 ➝ N | Un gymnase possède plusieurs membres |
| **Gym → Session** | 1 ➝ N | Un gymnase propose plusieurs séances |
| **Member ⇄ Session** | N ➝ N | Un membre peut participer à plusieurs séances et chaque séance peut accueillir jusqu'à 20 membres maximum |
| **Coach ⇄ Session** | N ➝ N | Un coach peut animer plusieurs séances et chaque séance peut avoir jusqu’à deux coachs maximum |

### 🧩 Tables de liaison

- `Member_Session` : gère les inscriptions des membres aux séances
- `Coach_Session` : gère l’affectation des coachs aux séances

---

## 🛠️ Outil utilisé

Le diagramme entité-relation a été conçu à l'aide de l'outil en ligne **draw.io** (aussi appelé diagrams.net).

- 🗃️ **DBML** (DBDiagram.io) pour les premières structures
- 🖼️ **Draw.io** (app.diagrams.net) pour le diagramme final
- 🧪 **RunSQL.com** pour tester les requêtes SQL

---

## 🧱 Diagramme ERD

Le diagramme a été conçu avec [draw.io (diagrams.net)](https://app.diagrams.net) et décrit les entités suivantes :

- `GYM`
- `MEMBER`
- `COACH`
- `SESSION`
- `MEMBER_SESSION` (relation N-N entre membre et séance)
- `COACH_SESSION` (relation N-N entre coach et séance)

📄 Le fichier du diagramme est disponible ici :

- https://drive.google.com/file/d/18fPWHgsc_9mGshnmz2g9KyJOoq2tqebf/view?usp=sharing (importable sur diagrams.net)
- https://dbdiagram.io/d/GYMNASE_DIAGRAMS-67ffa6ff1ca52373f53d83b3 (importable sur dbdiagram.io)

---

## 📁 Fichiers fournis

- `GYMNASE_DIAGRAMS.sql` : contient les requêtes SQL pour créer la base de données.
- `GYMNASE_DIAGRAMS.png` : le diagramme ER en image PNG
- `GYMNASE_DIAGRAMS.drawio` : le diagramme ER modélisé avec draw.io.
- `README.md` : ce fichier de présentation du Checkpoint
- `GYMNASE_DIAGRAMS.js` : contient du Code JavaScript (Node.js + Sequelize) qui permet de faire l'implementation complète du Backend pour gérer la Salle de Sport.

---

## 💾 Installation & Exécution

1. Cloner ce dépôt :

```bash

git clone https://github.com/AbegaTheo/Modele_ER_Checkpoint.git

```

---

## 🗄️ Script SQL

Un script SQL a été rédigé pour créer les tables correspondantes à la base de données, compatible avec [runsql.com](https://runsql.com).

### 🧩 Tables créées

- `Gym`
- `Member`
- `Coach`
- `Session`
- `Member_Session`
- `Coach_Session`

✅ Le fichier SQL est prêt à être utilisé pour créer une base fonctionnelle et testable.
