// import User from '../model/userSchema.js';

// const updateUserController = async (req, res, next) => {
//     try {
//         const { name, email, password } = req.body;
//         if (!name && !email && !password) {
//             return res.status(400).json({ error: 'Please provide at least one field for update.' });
//         }
//         const user = req.user;
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }


//         console.log(req.user);
//         if (name) {
//             user.name = name;
//         }

//         if (email) {
//             user.email = email;
//         }

//         if (password) {
//             user.password = password;
//         }

//         // Save the updated user to the database
//         await user.save();

//         // Generate a new JWT token
//         const token = req.token;

//         // Send the response with updated user and token
//         res.status(200).json({
//             success: true,
//             message: 'User updated successfully',
//             user: user, // Remove password from the response
//             token
//         });
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// };

// export default updateUserController;
import User from '../model/userSchema.js';

const updateUserController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Retrieve the user from the request object
        const user = req.user;

        // Check if the user is defined
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user properties if provided in the request body
        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = password;
        }

        // Save the updated user to the database
        await user.save();

        // Generate a new JWT token
        const token = req.token;

        // Send the response with updated user and token
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: user.toJSON(), // Remove password from the response
            token
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export default updateUserController;
