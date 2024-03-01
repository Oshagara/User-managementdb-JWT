const user = require("../api/model/User");

const getUsers = async (req, res) => {
    try {
        const users = await user.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const { name, email, jobTitle, company } = req.body;

    try {
        const newUser = await user.create({
            name,
            email,
            jobTitle,
            company,
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await user.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, jobTitle, company } = req.body;

    try {
        const updatedUser = await user.findByIdAndUpdate(
            userId,
            { name, email, jobTitle, company },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports ={
    getUsers,
    createUser,
    deleteUser,
    updateUser
}