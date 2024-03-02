const UserList = [{
    username: 'testusername',
    email: 'test@email.com',
    id: "123",
    location: {
        country: 'Brasil',
        state: 'São Paulo',
        city: 'Santo André',
        postalCode: '11111-00'
    }
}]

const ProductsList = [
  {
    id: "1",
    name: "Product 1",
    image: "https://example.com/product1.jpg",
    sku: 12345,
  },
  {
    id: "2",
    name: "Product 2",
    image: "https://example.com/product2.jpg",
    sku: 67890,
  },
  {
    id: "5",
    name: "Product 5",
    image: "https://example.com/product5.jpg",
    sku: 54321,
  },
  {
    id: "6",
    name: "Product 6",
    image: "https://example.com/product6.jpg",
    sku: 13579,
  },
  {
    id: "7",
    name: "Product 7",
    image: "https://example.com/product7.jpg",
    sku: 24680,
  },
  {
    id: "10",
    name: "Product 10",
    image: "https://example.com/product10.jpg",
    sku: 11223,
  },
  {
    id: "16",
    name: "Product 16",
    image: "https://example.com/product16.jpg",
    sku: 700,
  },
  {
    id: "17",
    name: "Product 17",
    image: "https://example.com/product17.jpg",
    sku: 98765,
  },
  {
    id: "20",
    name: "Product 20",
    image: "https://example.com/product20.jpg",
    sku: 44556,
  },
  {
    id: "21",
    name: "Product 21",
    image: "https://example.com/product21.jpg",
    sku: 91402,
  },
  {
    id: "22",
    name: "Product 22",
    image: "https://example.com/product22.jpg",
    sku: 15032,
  },
  // Add more products...
  {
    id: "25",
    name: "Product 25",
    image: "https://example.com/product25.jpg",
    sku: 49494,
  },
  {
    id: "26",
    name: "Product 26",
    image: "https://example.com/product26.jpg",
    sku: 20202,
  },
  {
    id: "27",
    name: "Product 27",
    image: "https://example.com/product27.jpg",
    sku: 87654,
  },
  // Add more products...
  {
    id: "30",
    name: "Product 30",
    image: "https://example.com/product30.jpg",
    sku: 67890,
  },
];

const UsersProductsList = [
    {
      id: "1",
      userID: "123",
      products: [
        {
          id: "1",
          name: "Product 1",
          image: "https://example.com/product1.jpg",
          sku: 12345,
        },
        {
          id: "2",
          name: "Product 2",
          image: "https://example.com/product2.jpg",
          sku: 67890,
        },
        {
          id: "5",
          name: "Product 5",
          image: "https://example.com/product5.jpg",
          sku: 54321,
        },
      ],
    },
    {
      id: "2",
      userID: "2",
      products: [
        {
          id: "6",
          name: "Product 6",
          image: "https://example.com/product6.jpg",
          sku: 13579,
        },
        {
          id: "7",
          name: "Product 7",
          image: "https://example.com/product7.jpg",
          sku: 24680,
        },
        {
          id: "10",
          name: "Product 10",
          image: "https://example.com/product10.jpg",
          sku: 11223,
        },
      ],
    },
    {
      id: "5",
      userID: "5",
      products: [
        {
          id: "16",
          name: "Product 16",
          image: "https://example.com/product16.jpg",
          sku: 700,
        },
        {
          id: "17",
          name: "Product 17",
          image: "https://example.com/product17.jpg",
          sku: 98765,
        },
        {
          id: "20",
          name: "Product 20",
          image: "https://example.com/product20.jpg",
          sku: 44556,
        },
      ],
    },
    {
      id: "6",
      userID: "6",
      products: [
        {
          id: "21",
          name: "Product 21",
          image: "https://example.com/product21.jpg",
          sku: 91402,
        },
        {
          id: "22",
          name: "Product 22",
          image: "https://example.com/product22.jpg",
          sku: 15032,
        },
        // Add more products...
        {
          id: "25",
          name: "Product 25",
          image: "https://example.com/product25.jpg",
          sku: 49494,
        },
      ],
    },
    {
      id: "7",
      userID: "7",
      products: [
        {
          id: "26",
          name: "Product 26",
          image: "https://example.com/product26.jpg",
          sku: 20202,
        },
        {
          id: "27",
          name: "Product 27",
          image: "https://example.com/product27.jpg",
          sku: 87654,
        },
        // Add more products...
        {
          id: "30",
          name: "Product 30",
          image: "https://example.com/product30.jpg",
          sku: 67890,
        },
      ],
    },
  ];

module.exports = { UserList, ProductsList, UsersProductsList };