export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
}

export default async function fetchRandomUser(): Promise<User> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No users found');
    }
    return data[0];
}
