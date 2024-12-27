import express from 'express';
import { generatePets } from '../mocks/mockingPets.js';
import { generateUsers } from '../mocks/mockingUsers.js';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';

const router = express.Router();

router.get('/mockingpets', (req, res) => {
    const pets = generatePets(50);
    res.send({status:'success',payload:pets});
});

router.get('/mockingusers', (req, res) => {
    const users = generateUsers(50);
    res.send({status:'success',payload:users});
});

router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets) {
        return res.send({status:400,error:'Both "users" and "pets" parameters are required'});
    }

    try {
        const generatedUsers = generateUsers(users);
        const generatedPets = generatePets(pets);
        const insertedUsers = await User.insertMany(generatedUsers);
        const insertedPets = await Pet.insertMany(generatedPets);
        
        return res.send({status:200,message: 'Data generated successfully',insertedUsers: insertedUsers.length,insertedPets: insertedPets.length,});
    } catch (error) {
        console.error('Error generating or inserting data:', error);
        
        return res.send({status:500,error:'Error generating or inserting data',details: error.message});
    }
});

export default router;
