import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { MockLink } from '@apollo/client/testing';
import { LOGIN_MUTATION } from './graphql/mutations/loginMutation';
import { REGISTER_MUTATION } from './graphql/mutations/registerMutation';
import { GET_PRODUCTS } from './graphql/mutations/getProductsMutation';
import productImg1 from './custom-magic-the-gathering-cards-1.png';
import productImg2 from './custom-magic-the-gathering-cards-2.jpg';
import productImg3 from './custom-magic-the-gathering-cards-3.png';

var products = [];

var numProducts = 15;

for (var i = 0; i < numProducts; i++) {
  products.push(  {
      id: 1,
      name: "Card " + i,
      image: (i%3===0 ? productImg3 : i%2===0 ? productImg2 : productImg1),
      sku: "SKU00" + i
    });
}


const mockLink = new MockLink([
    {
      request: {
        query: LOGIN_MUTATION, // Your actual login mutation
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
          filter: 'test-search',
        }
      },
      result: {
        data: {
          products
        }
      }
    }
]);


const client = new ApolloClient({
  link: mockLink.concat(createHttpLink({ uri: '/graphql' })),
  cache: new InMemoryCache()
});

export default client;