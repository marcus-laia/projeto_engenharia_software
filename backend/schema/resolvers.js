const { UserList } = require("../fake-data")
const { ProductsList } = require("../fake-data")
const lo = require("lodash"); //enquanto não temos uma DB

const resolvers = {
    Query: {
        users: () => {
            return UserList;
        },

        user: (_, args) => {
            const id = args.id;
            const user = lo.find(UserList, { id: Number(id) });
            return user
        }
    },
    User: {
        userProductsList: (parent) => {
            return lo.filter(ProductsList, (list) => list.userID == parent.id);
        }
    }
}

module.exports = { resolvers }