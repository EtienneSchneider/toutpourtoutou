import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:3001/toutpourtoutou-api";

export const AppApi = () => {
    const request = (method, endpoint, parameters = {}) => {
        const hasRequestBody = ['POST', 'PUT', 'PATCH'].includes(method);
        const params = hasRequestBody ? undefined : parameters;
        const data = hasRequestBody ? parameters : {};
        
        return axios({
            withCredantials: false, 
            baseURl: "http://127.0.0.1:3001/toutpourtoutou-api",
            method: method,
            url: endpoint || '',
            Headers: {
                Accept: 'application/json',
                Authorization: `Brearer ${localStorage.getItem('accessToken')}`
            },
            params: params,
            data: data,
        })
            .then((response) => response)
            .catch((error) => {
                throw new Error(error.response.data);
            });
    };

    return {
        getAuthStatus: () => request('GET', '/status'),
        login: (credantials) => request('POST', '/login', credantials),
        createAccount: (data) => request('POST', '/createAccount', data),
        addDog: (data) => request('POST', '/addDog', data),
        getUserDogs: (data) => request('GET', '/userDogs', data),
        createOrder: (data) => request('POST', '/createOrder', data),
        getUserOrders: (data) => request('GET', '/userOrders', data),
        addProduct: (data) => request('POST', '/addProduct', data),
        getAllProducts: (data) => request('GET', '/allProducts', data),
        getRecommendations: (data) => request('GET', '/recommendations', data),      
    }
};

export const api = AppApi;