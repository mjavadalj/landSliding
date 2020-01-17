
module.exports.testUser = {
    username: `testUsername${Math.floor(Math.random() * 1000)}`,
    email: `testEmail${Math.floor(Math.random() * 1000)}@yahoo.com`,
    password: "test1",
    confirmPassword: "test1"
};

module.exports.addRequest = (user) => {
    return {
        "id": user._id,
        "title": "typeOne",
        "location": {
            "type": "Point",
            "coordinates":
                ["13.12", "99.4"]

        }
    }

}
module.exports.getUserRequests = (user) => {
    return {
        "userId": user._id
    }

}



// * must be handled
module.exports.loginUser = {
    email: "javadam@yahoo.com",
    password: "javad11",
};

module.exports.getRequest = {
    requestId: `5e217ffc13508d51a424adc4`,
};