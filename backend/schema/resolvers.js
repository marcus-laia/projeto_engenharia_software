const { UserList } = require("../fake-data")
const { ProductsList } = require("../fake-data")
const { UsersProductsList } = require("../fake-data")
const lo = require("lodash"); //enquanto não temos uma DB

const resolvers = {
    Query: {
        users: () => {
            return UserList;
        },

        user: (_, args) => {
            const id = args.id;
            const user = lo.find(UserList, { id: id });
            return user
        },

        getProducts: (_, args) => {
            return ProductsList;
        },

        getUserInfo: (_, args) => {
            const id = args.userId;
            const user = lo.find(UserList, { id: id });
            return user;
        },

        getUserProducts: (_, args) => {
            const id = args.userId;
            const userProductsList = lo.find(UsersProductsList, { userID: id });
            return userProductsList.products;
        }
    },
    User: {
        userProductsList: (parent) => {
            return lo.filter(UsersProductsList, { userID: parent.id });
        }
    },
};

module.exports = { resolvers }