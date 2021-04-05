const config = require('config.json');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'shimaoka', name: 'José Poderoso', role: 'admin' },
    { id: 2, username: 'operador', password: 'shimaoka', name: 'José Dentista' , role: 'operador'},
    { id: 3, username: 'paciente', password: 'shimaoka', name: 'José Paciente' , role: 'user'},
];

module.exports = {
    authenticate,
    getAllPatients,
    createPatient,
    getAllDentists,
    createDentist
};

async function authenticate({ email, password }) {
    const user = await User.findOne({email: email, password: password});
    if (!user || user.length < 1) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, { expiresIn: '7d' });
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updateAt: user.updatedAt,
        token: token
    }
    return payload;
}

async function getAllPatients() {
    return User.find({role: 'user'})
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
}

async function getAllDentists() {
    return User.find({role: 'operador'})
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
}

async function createDentist(req) {
    const checkIfUserExist = await User.findOne({email: req.email});
    if (checkIfUserExist) throw 'Usuário já existe';
    const user = new User(req);
    user.role = 'operador';
    user.save().then((result) => {
        return result;
    });
}

async function createPatient(req) {
    const checkIfUserExist = await User.findOne({email: req.email});
    if (checkIfUserExist) throw 'Usuário já existe';
    const user = new User(req);
    user.role = 'user';
    user.save().then((result) => {
        return result;
    });
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}