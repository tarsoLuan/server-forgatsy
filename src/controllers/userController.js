const User = require('../models/user');

const getUser = async(req,res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({where : {email : email}})
        if (!user) {
            return res.status(401).json({ message: 'Usuário não existe ou desativado.' })
        }
        if (password !== user.password) {
            return res.status(401).json({ message: 'Senha incorreta.' })
        }

        res.json(user)
    } catch (e) {
        console.error(e)
        res.status(500).send('Server error')
    }
}

const addUser = async (req, res) => {
    try {
        const { name, email, password, imageBlob } = req.body;

        const user = await User.create({
            name: name,
            email: email,
            password: password,
            imageBlob: imageBlob,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            imageBlob: user.imageBlob,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (e) {
        console.error(e);

        // Verifique se o erro é de validação do Sequelize
        if (e.name === 'SequelizeValidationError') {
            // Extraia mensagens de erro de validação
            const validationErrors = e.errors.map((error) => ({
                field: error.path,
                message: error.message,
            }));
            res.status(400).json({ errors: validationErrors });
        } else {
            res.status(500).send('Server error');
        }
    }
}

module.exports = {getUser, addUser}