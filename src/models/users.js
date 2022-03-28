export default class User {
    fullName = ''; 
    constructor(data) {
        this.fullName = (data.user.name + ' ' + data.user.surname + ' ' + data.user.lastName).toLowerCase();
         
    }
    
}