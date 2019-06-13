/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (priProps, objs) => {
    var newObjs = [] ;
    objs.forEach((obj) => {
        let newObj = {};
        Object.getOwnPropertyNames(obj).forEach( (objProp) => {
            if(!priProps.includes(objProp)) {
                newObj[objProp] = obj[objProp];
            }
        });
        newObjs.push(newObj);
    });
    return newObjs;
};
exports.excludeByProperty = (prop, objs) => {
    var newObjs = [] ;
    objs.forEach((obj) => {
        if(!obj.hasOwnProperty(prop)){
            newObjs.push(Object.assign({}, obj));
        }
    });
    return newObjs;
};
exports.sumDeep = (objsArray) => {
    var newObjsArray = [] ;
    objsArray.forEach((objs) => {
        var obj = {};
        let sum = objs['objects'].reduce((acc, curr) => 
            acc + curr['val'], 0
            );
        obj['objects'] = sum;
        newObjsArray.push(obj);
    });
    return newObjsArray;
};
exports.applyStatusColor = (colors, statsArray) => {
    let newArray = [];
    var colorMap = new Map();
    Object.keys(colors).forEach((color) => {
        colors[color].forEach((s) => colorMap.set(s,color));
    });
    statsArray.map((eachStatus) => {
        if(colorMap.has(eachStatus['status'])){
            eachStatus['color'] = colorMap.get(eachStatus['status']);
            newArray.push(eachStatus);
        }
    });
    return newArray;
};
exports.createGreeting = (greetFn, greetType) => {
    return (function curryFn() {
        const args = Array.prototype.slice.call(arguments);
        return args.length >= greetFn.length ?
            greetFn.apply(null, args) :
            curryFn.bind(null, ...args)
    })(greetType);
};
exports.setDefaults = (defaults) => {
    return function verifyObj(obj) {
        let defaultKeys = Object.keys(defaults);
        let targetKeys = Object.keys(obj);
        defaultKeys.forEach((key)=> {
            if(!targetKeys.includes(key)){
                obj[key] = defaults[key];
            }
        });
        return obj;
    };
};
exports.fetchUserByNameAndUsersCompany = (userName, services) => {
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
                console.dir(obj);
                resolve(obj);});
        });
    });
};
