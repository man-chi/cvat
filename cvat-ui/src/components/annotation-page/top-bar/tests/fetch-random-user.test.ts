import fetchRandomUser from 'actions/fetch-random-user';

global.fetch = jest.fn();

describe('fetchRandomUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch and return the first user', async () => {
        const mockUser = {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            address: {
                street: 'Kulas Light',
                suite: 'Apt. 556',
                city: 'Gwenborough',
                zipcode: '92998-3874',
                geo: {
                    lat: '-37.3159',
                    lng: '81.1496',
                },
            },
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce([mockUser]),
        });

        const user = await fetchRandomUser();

        expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
        expect(user).toEqual(mockUser);
    });

    // CHECK IF THE FUNCTION THROWS AN ERROR IF THE FETCH FAILS
    it('should throw an error if the fetch fails', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        await expect(fetchRandomUser()).rejects.toThrow('Network error');
        expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });

    // CHECK IF THE FUNCTION THROWS AN ERROR WHEN THE RESPONSE IS NOT AN ARRAY
    it('should throw an error if the response is not an array', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({}),
        });

        await expect(fetchRandomUser()).rejects.toThrow('No users found');
        expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });

    // CHECK IF THE FUNCTION THROWS AN ERROR WHEN THE RESPONSE ARRAY IS EMPTY
    it('should throw an error if the response array is empty', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce([]),
        });

        await expect(fetchRandomUser()).rejects.toThrow('No users found');
        expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });
});
