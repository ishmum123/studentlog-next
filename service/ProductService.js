export default class ProductService {
    getProducts() {
        const apiURL = 'http://localhost:9000/tests';
        return fetch(apiURL,
            {
                method: 'GET'
            })
            .then(response => response.json())
    }
}