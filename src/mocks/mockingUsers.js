import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import config from '../config/config';

export const generateUsers = (numUsers) => {
    const users = [];

    for (let i = 0; i < numUsers; i++) {
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('coder123', config.bcrypt.BCRYPT_SALT_ROUNDS), 
            role: faker.helpers.arrayElement(['user', 'admin']), 
            pets: [],
        };

        users.push(user);
    }

    return users;
};
