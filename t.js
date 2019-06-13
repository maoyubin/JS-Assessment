
const {
    services, companies, status, users,
  } = require('./__tests__/__helpers__/p7');

var n = 'stan';
var fetchUserByNameAndUsersCompany = (userName,services) => {
    return services.fetchUsers().then(function(users) {
        let user = users.find(({ name }) => name === userName);
        return new Promise(resolve => resolve(user));
    }).then((user) => {
        return services.fetchCompanyById(user.companyId).then(function(company){
            return new Promise(resolve => resolve({user,company}));
        });
    }).then(function(obj){
        return services.fetchStatus().then((status) => {
            return new Promise(resolve => {
                obj['status'] = status;
                resolve(obj);});
        });
    });
};

var u1 = {
    company: companies[2],
    status,
    user: users[1],
  };
  console.dir(u1);

fetchUserByNameAndUsersCompany(n,services).then((result) => console.log(result));
