import axios from 'axios';

export default class ProductService {

    getProducts() {
        return fetch('http://localhost:9000/tests',
            {
                method: 'GET'
            })
            .then(response => response.json())
    }

    // getProductsWithOrdersSmall() {
    //     return axios.get('data/products-orders-small.json').then(res => res.data.data);
    // }
}