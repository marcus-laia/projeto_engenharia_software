import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { MockLink } from '@apollo/client/testing';
import { LOGIN_MUTATION } from './graphql/mutations/loginMutation';
import { REGISTER_MUTATION } from './graphql/mutations/registerMutation';
import { GET_PRODUCTS } from './graphql/mutations/getProductsMutation';
import { GET_MASTER_PRODUCTS } from './graphql/mutations/getMasterProductsMutation';
import { ADD_CARDS } from './graphql/mutations/addCardsMutation';
import productImg1 from './custom-magic-the-gathering-cards-1.png';
import productImg2 from './custom-magic-the-gathering-cards-2.jpg';
import productImg3 from './custom-magic-the-gathering-cards-3.png';

var products = [];
var products_master = [];

var num_products = 15;
var num_products_master = 10;

for (var i = 0; i < num_products; i++) {
  products.push(  {
      id: i,
      name: "Card " + i,
      image: (i%3===0 ? productImg3 : i%2===0 ? productImg2 : productImg1),
      sku: "SKU00" + i
    });
}

for (var j = 0; j < num_products_master; j++) {
  products_master.push(  {
      id: j,
      name: "Card MASTER " + j,
      image: (j%3===0 ? productImg3 : j%2===0 ? productImg2 : productImg1),
      sku: "SKU00" + j
    });
}


const mockLink = new MockLink([
    {
      request: {
        query: LOGIN_MUTATION,
        variables: {
          username: 'Test',
          password: 'Pass@123'
        }
      },
      result: {
        data: {
          login: {
            success: true,
            token: 'your_mocked_token'
          }
        }
      }
    },
    {
      request: {
        query: REGISTER_MUTATION,
        variables: {
          username: 'Test',
          password: 'Pass@123'
        }
      },
      result: {
        data: {
          register: {
            success: true,
            token: 'your_mocked_token'
          }
        }
      }
    },
    {
      request: {
        query: GET_PRODUCTS,
        variables: {
          filter: 'all-products',
        }
      },
      result: {
        data: {
          products
        }
      }
    },
    {
      request: {
        query: GET_PRODUCTS,
        variables: {
          filter: '',
        }
      },
      result: {
        data: {
          products
        }
      }
    },
    {
      request: {
        query: GET_MASTER_PRODUCTS,
        variables: {
          filter: 'all-products-master',
        }
      },
      result: {
        data: {
          products: products_master
        }
      }
    },
    {
      request: {
        query: GET_MASTER_PRODUCTS,
        variables: {
          filter: '',
        }
      },
      result: {
        data: {
          products: products_master
        }
      }
    },
    {
      request: {
        query: GET_MASTER_PRODUCTS,
        variables: {
          filter: 'NomeCarta1',
        }
      },
      result: {
        data: {
          products: products_master.slice(0,5)
        }
      }
    },
    {
      request: {
        query: GET_MASTER_PRODUCTS,
        variables: {
          filter: 'NomeCarta2',
        }
      },
      result: {
        data: {
          products: products_master.slice(5,10)
        }
      }
    },
    {
      request: {
        query: ADD_CARDS,
        variables: {
          productIds: [0,1,2],
          userId: 'testUserId'
        }
      },
      result: {
        success: true,
        message: 'Added products successfully',
        userProductsList: products.slice(0, 2)
      }
    }
]);


const client = new ApolloClient({
  link: mockLink.concat(createHttpLink({ uri: '/graphql' })),
  cache: new InMemoryCache()
});

export default client;