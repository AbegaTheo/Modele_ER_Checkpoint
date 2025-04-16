const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

// Définition du modèle Gymnase
const Gym = sequelize.define('Gym', {
    gym_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    address: { 
        type: DataTypes.STRING(200), 
        allowNull: false 
    },
    phone_number: { 
        type: DataTypes.STRING(20), 
        allowNull: false,
        validate: {
            is: /^[0-9]{10}$/
        }
    }
}, {
    timestamps: false
});

// Définition du modèle Membre
const Member = sequelize.define('Member', {
    member_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    first_name: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    last_name: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    address: { 
        type: DataTypes.STRING(200), 
        allowNull: false 
    },
    birth_date: { 
        type: DataTypes.DATEONLY, 
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date().toISOString()
        } 
    },
    gender: { 
        type: DataTypes.ENUM('Homme', 'Femme', 'Autre'),
        allowNull: false 
    },
    gym_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Gyms',
            key: 'gym_id'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});

// Définition du modèle Coach
const Coach = sequelize.define('Coach', {
    coach_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    first_name: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    last_name: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    age: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        validate: { 
            min: 18,
            max: 70
        } 
    },
    specialty: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    }
}, {
    timestamps: false
});

// Définition du modèle Séance
const Session = sequelize.define('Session', {
    session_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    sport_type: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    schedule: { 
        type: DataTypes.DATE, 
        allowNull: false,
        validate: {
            isDate: true,
            isAfter: new Date().toISOString()
        }
    },
    max_capacity: { 
        type: DataTypes.INTEGER, 
        defaultValue: 20,
        validate: {
            min: 1,
            max: 20
        }
    },
    gym_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Gyms',
            key: 'gym_id'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});

// Table de liaison entre les Séances et les Coachs
const SessionCoach = sequelize.define('SessionCoach', {
    session_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
            model: 'Sessions',
            key: 'session_id'
        },
        onDelete: 'CASCADE'
    },
    coach_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
            model: 'Coachs',
            key: 'coach_id'
        },
        onDelete: 'CASCADE'
    }
}, { 
    timestamps: false,
    tableName: 'session_coach' 
});

// Table d'inscription (Séances et Membres)
const Registration = sequelize.define('Registration', {
    registration_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Sessions',
            key: 'session_id'
        },
        onDelete: 'CASCADE'
    },
    member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Members',
            key: 'member_id'
        },
        onDelete: 'CASCADE'
    },
    registration_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});

// Définition des relations
Gym.hasMany(Member, { foreignKey: 'gym_id' });
Member.belongsTo(Gym, { foreignKey: 'gym_id' });

Gym.hasMany(Session, { foreignKey: 'gym_id' });
Session.belongsTo(Gym, { foreignKey: 'gym_id' });

Session.belongsToMany(Coach, { 
    through: SessionCoach,
    foreignKey: 'session_id',
    otherKey: 'coach_id'
});
Coach.belongsToMany(Session, { 
    through: SessionCoach,
    foreignKey: 'coach_id',
    otherKey: 'session_id'
});

Session.belongsToMany(Member, { 
    through: Registration,
    foreignKey: 'session_id',
    otherKey: 'member_id'
});
Member.belongsToMany(Session, { 
    through: Registration,
    foreignKey: 'member_id',
    otherKey: 'session_id'
});

// Hooks pour les validations métier
SessionCoach.afterCreate(async (sessionCoach, options) => {
    const count = await SessionCoach.count({
        where: { session_id: sessionCoach.session_id }
    });
    
    if (count > 2) {
        throw new Error('Une séance ne peut avoir que 2 coachs maximum');
    }
});

Registration.afterCreate(async (registration, options) => {
    const session = await Session.findByPk(registration.session_id);
    const count = await Registration.count({
        where: { session_id: registration.session_id }
    });
    
    if (count > session.max_capacity) {
        throw new Error('La séance a atteint sa capacité maximale');
    }
});

module.exports = {
    sequelize,
    Gym,
    Member,
    Coach,
    Session,
    SessionCoach,
    Registration
};