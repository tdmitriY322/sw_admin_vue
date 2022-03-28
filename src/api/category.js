import axios from "axios";

const client = axios.create({
    baseURL: process.env.VUE_APP_ADDRESS,
    json: true
});
export default {
    async execute(method, resource, data, headers = {}) {
        return client({
            crossdomain: true,
            headers: headers,
            method,
            url: resource,
            data
        }).then(
            (response) => {
                return response.data
            },
            (error) => {
                if (process.env.VUE_APP_SHOW_API_ERRORS) {
                    console.log('Ошибка в запросе по пути ' + resource + ' | status: ' + error.request.status)
                }
            }
        )
    },
    editCategory(value){ 
        return this.execute('post', 'category/edit', value);
    },
    createCategory(value){ 
        return this.execute('post', 'category/create', value);
    },
    editProduct(value){ 
        return this.execute('post', 'product/edit', value);
    },
    createProduct(value){ 
        return this.execute('post', 'product/create', value);
    },
    getCategoryList(){
        return this.execute('get', 'category');
    },
    getProductList(){
        return this.execute('get', 'products');
    },
    deleteProductList(){
        return this.execute('delete', 'products');
    },
    getCategorySingle(value){
        return this.execute('get', 'category/single/' + value);    
    },
}