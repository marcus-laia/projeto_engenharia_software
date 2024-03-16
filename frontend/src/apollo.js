import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { MockLink } from '@apollo/client/testing';
import { LOGIN_MUTATION } from './graphql/mutations/loginMutation';
import { REGISTER_MUTATION } from './graphql/mutations/registerMutation';
import { GET_PRODUCTS } from './graphql/mutations/getProductsQuery';
import { GET_MASTER_PRODUCTS } from './graphql/mutations/getMasterProductsMutation';
import { ADD_CARDS } from './graphql/mutations/addCardsMutation';
import { GET_CHAT } from './graphql/mutations/getChatMutation';
import { GET_ALL_CHATS } from './graphql/mutations/getAllChatsMutation';
import { SEND_MESSAGE_MUTATION } from './graphql/mutations/sendMessageMutation';
import { GET_USER_INFO } from './graphql/mutations/getUserInfoQuery';
import { UPDATE_USER_LOCATION } from './graphql/mutations/updateUserLocationMutation';
import productImg1 from './custom-magic-the-gathering-cards-1.png';
import productImg2 from './custom-magic-the-gathering-cards-2.jpg';
import productImg3 from './custom-magic-the-gathering-cards-3.png';
import { REMOVE_CARDS } from './graphql/mutations/removeCardsMutation';
import { GET_USER_PRODUCTS } from './graphql/mutations/getUserProductsQuery';
import { GET_NEGOTIATION } from './graphql/mutations/getNegotiationQuery';
import { GET_NEGOTIATION_PRODUCTS } from './graphql/mutations/getNegotiationProductsQuery';
import { GET_PRODUCT_DETAILS } from './graphql/mutations/getProductDetailsQuery';

var products = [];
var products_master = [];

var num_products = 30;
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

const messages = [
  { from: 123, content: "Olá" },
  { from: 456, content: "Oi" },
  { from: 123, content: "Quer trocar o sol ring?" },
  { from: 456, content: "Sim, eu gostaria" },
  { from: 456, content: "Vi na sua lista que tem um estorrar, topa trocar?" },
  { from: 123, content: "Claro!" },
  { from: 123, content: "Tenho algumas outras também, quer mais alguma?" },
  { from: 456, content: "Olhei toda sua lista, e estava querendo a kaheera também" },
  { from: 456, content: "E aí eu te dou dois sol rings, que tal?" },
  { from: 123, content: "Fechado!!!!" },
  { from: 456, content: "Vamos marcar de ir na loja." },
];

const chats = [
  {otherUserName: 'José', otherUserId: 456, lastMessage: 'Vamos marcar de ir na loja.'},
  {otherUserName: 'Maria', otherUserId: 111, lastMessage: 'Sim, eu quero sua carta.'},
  {otherUserName: 'Madalena', otherUserId: 222, lastMessage: 'Estou interessada.'}
];


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
            token: 'your_mocked_token',
            userId: 123, 
            username: 'Test',
            location: {
              country: 'Brasil',
              state: 'São Paulo',
              city: 'Santo André',
              postalCode: '11111-00'
            }
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
          getProducts: products_master
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
          userId: 123
        }
      },
      result: {
        success: true,
        message: 'Added products successfully',
        userProductsList: products.slice(0, 2)
      }
    },
    {
      request: {
        query: REMOVE_CARDS,
        variables: {
          productIds: [0,1,2],
          userId: 123
        }
      },
      result: {
        success: true,
        message: 'Removed products successfully',
        userProductsList: products.slice(0, 2)
      }
    },
    {
      request: {
        query: GET_CHAT,
        variables: {
          currentUserId: 123,
          otherUserId: 456
        }
      },
      result: {
        data: {
          messages: messages
        }
      }
    },
    {
      request: {
        query: GET_USER_PRODUCTS,
        variables: {
          userId: 123,
          filter: ''
        }
      },
      result: {
        data: {
          products: products.slice(0, 5)
        }
      }
    },
    {
      request: {
        query: GET_USER_INFO
      },
      result: {
        data: {
          userInfo: {
            username: 'testusername',
            email: 'test@email.com',
            id: 123,
            location: {
              country: 'Brasil',
              state: 'São Paulo',
              city: 'Santo André',
              postalCode: '11111-00'
            }
          }
        }
      }
    },
    {
      request: {
        query: GET_ALL_CHATS,
        variables: {
          currentUserId: 123
        }
      },
      result: {
        data: {
          chats: chats
        }
      }
    },
    {
      request: {
        query: SEND_MESSAGE_MUTATION,
        variables: {
          text: 'Bora!',
          currentUserId: 123,
          otherUserId: 456
        }
      },
      result: {
        status: 'success'
      }
    },
    {
      request: {
        query: UPDATE_USER_LOCATION,
        variables: {
          userId: 123,
          location: {
            country: 'Brasil',
            state: 'São Paulo',
            city: 'São Caetano',
            postalCode: '12345-67'
          }
        }
      },
      result: {
        success: true,
        message: 'Location changed successfully!'
      }
    },
    {
      request: {
        query: GET_NEGOTIATION,
        variables: {
          userId1: 123,
          userId2: 456
        }
      },
      result: {
        data: {
          negotiationId: 999
        }
      }
    },
    {
      request: {
        query: GET_NEGOTIATION_PRODUCTS,
        variables: {
          negotiationId: 999,
          userId: 123
        }
      },
      result: {
        data: {
          products: products.slice(0, 10)
        }
      }
    },
    {
      request: {
        query: GET_NEGOTIATION_PRODUCTS,
        variables: {
          negotiationId: 999,
          userId: 456
        }
      },
      result: {
        data: {
          products: products.slice(2, 5)
        }
      }
    },
    {
      request: {
        query: GET_PRODUCT_DETAILS,
        variables: {
          productId: 0
        }
      },
      result: {
        data: {
          getProduct: {
            id: products[0].id,
            name: products[0].name,
            image: products[0].image,
            sku: products[0].sku,
            collection: 'special-collection-2024',
            text_description: 'this is the text of the card!',
            owner_id: 456
          }
        }
      }
    },
    {
      request: {
        query: GET_PRODUCT_DETAILS,
        variables: {
          productId: 1
        }
      },
      result: {
        data: {
          getProduct: {
            id: products[1].id,
            name: products[1].name,
            image: products[1].image,
            sku: products[1].sku,
            collection: 'special-collection-2024',
            text_description: 'this is the text of the card!',
            owner_id: 456
          }
        }
      }
    },
    {
      request: {
        query: GET_PRODUCT_DETAILS,
        variables: {
          productId: 2
        }
      },
      result: {
        data: {
          getProduct: {
            id: products[2].id,
            name: products[2].name,
            image: products[2].image,
            sku: products[2].sku,
            collection: 'special-collection-2024',
            text_description: 'this is the text of the card!',
            owner_id: 456
          }
        }
      }
    },
]);


const client = new ApolloClient({
  link: mockLink.concat(createHttpLink({ uri: '/graphql' })),
  cache: new InMemoryCache()
});

// TO DO: adjust this when backend is up

// let authLink = (_, { headers }) => {
//   // Retrieve the JWT from local storage or cookies
//   const token = localStorage.getItem('customer_token'); // Example: localStorage key 'jwt'

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '', // Include the JWT in the authorization header
//     }
//   };
// };
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/graphql', // Our GraphQL server URL
// });

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// });

export default client;