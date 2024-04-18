import mysql.connector

# Connect to the MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="senha123pass",
    database="tept_db"
)

# Create a cursor object to interact with the database
cursor = db.cursor()

locations = [
    {
        'country': 'Brasil',
        'state': 'São Paulo',
        'city': 'Santo André',
        'postal_code': '11111-00'
    },
    {
        'country': 'Brasil',
        'state': 'São Paulo',
        'city': 'São Bernardo do Campo',
        'postal_code': '11111-01'
    }
]

login_list = [
    {
        'username': 'marcus1',
        'password': 'passMarcus',
    },
    {
        'username': 'lucas1',
        'password': 'passLucas',
    },
    {
        'username': 'joao1',
        'password': 'passJoao',
    },
    {
        'username': 'luis1',
        'password': 'passLuis'
    },
    {
        'username': 'daniel1',
        'password': 'passDaniel'
    },
]

user_list = [
    {
        'user_id': 1,
        'name': 'marcus',
        'email': 'marcus@email.com',
        'location_id': 1
    },
    {
        'user_id': 2,
        'name': 'lucas',
        'email': 'lucas@email.com',
        'location_id': 1
    },
    {
        'user_id': 3,
        'name': 'joao',
        'email': 'joao@email.com',
        'location_id': 1
    },
    {
        'user_id': 4,
        'name': 'luis',
        'email': 'luis@email.com',
        'location_id': 1
    },
    {
        'user_id': 5,
        'name': 'daniel',
        'email': 'daniel@email.com',
        'location_id': 1
    },
]

products_list = [
  {
    'name': "Product 1",
    'image': "https://example.com/product1.jpg",
    'sku': "1",
  },
  {
    'name': "Product 2",
    'image': "https://example.com/product2.jpg",
    'sku': "2",
  },
  {
    'name': "Product 5",
    'image': "https://example.com/product5.jpg",
    'sku': "5",
  },
  {
    'name': "Product 6",
    'image': "https://example.com/product6.jpg",
    'sku': "6",
  },
  {
    'name': "Product 7",
    'image': "https://example.com/product7.jpg",
    'sku': "7",
  },
  {
    'name': "Product 10",
    'image': "https://example.com/product10.jpg",
    'sku': "10",
  },
  {
    'name': "Product 16",
    'image': "https://example.com/product16.jpg",
    'sku': "16",
  },
  {
    'name': "Product 17",
    'image': "https://example.com/product17.jpg",
    'sku': "17",
  },
  {
    'name': "Product 20",
    'image': "https://example.com/product20.jpg",
    'sku': "20",
  },
  {
    'name': "Product 21",
    'image': "https://example.com/product21.jpg",
    'sku': "21",
  },
  {
    'name': "Product 22",
    'image': "https://example.com/product22.jpg",
    'sku': "22",
  },
  {
    'name': "Product 25",
    'image': "https://example.com/product25.jpg",
    'sku': "25",
  },
  {
    'name': "Product 26",
    'image': "https://example.com/product26.jpg",
    'sku': "26",
  },
  {
    'name': "Product 27",
    'image': "https://example.com/product27.jpg",
    'sku': "27",
  },
  {
    'name': "Product 30",
    'image': "https://example.com/product30.jpg",
    'sku': "30",
  },
]

user_products_list = [
  {'user_id': 4, 'product_id': 1, 'collection': '1', 'text_description': 'n1'},
  {'user_id': 4, 'product_id': 2, 'collection': '1', 'text_description': 'n1'},
  {'user_id': 4, 'product_id': 2, 'collection': '1', 'text_description': 'n2'},
  {'user_id': 4, 'product_id': 2, 'collection': '1', 'text_description': 'n3'},
  {'user_id': 4, 'product_id': 5, 'collection': '1', 'text_description': 'n1'},
  {'user_id': 2, 'product_id': 6, 'collection': '2', 'text_description': 'n1'},
  {'user_id': 2, 'product_id': 7, 'collection': '2', 'text_description': 'n1'},
  {'user_id': 2, 'product_id': 7, 'collection': '2', 'text_description': 'n2'},
  {'user_id': 2, 'product_id': 7, 'collection': '2', 'text_description': 'n3'},
  {'user_id': 2, 'product_id': 7, 'collection': '2', 'text_description': 'n4'},
  {'user_id': 2, 'product_id': 10, 'collection': '2', 'text_description': 'n1'},
  {'user_id': 5, 'product_id': 7, 'collection': '3', 'text_description': 'n1'},
  {'user_id': 5, 'product_id': 7, 'collection': '3', 'text_description': 'n2'},
  {'user_id': 5, 'product_id': 7, 'collection': '3', 'text_description': 'n3'},
  {'user_id': 5, 'product_id': 7, 'collection': '3', 'text_description': 'n4'},
  {'user_id': 5, 'product_id': 7, 'collection': '3', 'text_description': 'n5'},
  {'user_id': 5, 'product_id': 8, 'collection': '3', 'text_description': 'n1'},
  {'user_id': 5, 'product_id': 9, 'collection': '3', 'text_description': 'n1'},
  {'user_id': 1, 'product_id': 10, 'collection': '4', 'text_description': 'n1'},
  {'user_id': 1, 'product_id': 10, 'collection': '4', 'text_description': 'n2'},
  {'user_id': 1, 'product_id': 10, 'collection': '4', 'text_description': 'n3'},
  {'user_id': 1, 'product_id': 11, 'collection': '4', 'text_description': 'n1'},
  {'user_id': 1, 'product_id': 11, 'collection': '4', 'text_description': 'n2'},
  {'user_id': 1, 'product_id': 11, 'collection': '4', 'text_description': 'n3'},
  {'user_id': 1, 'product_id': 12, 'collection': '4', 'text_description': 'n1'},
  {'user_id': 1, 'product_id': 12, 'collection': '4', 'text_description': 'n2'},
  {'user_id': 3, 'product_id': 13, 'collection': '5', 'text_description': 'n1'},
  {'user_id': 3, 'product_id': 13, 'collection': '5', 'text_description': 'n2'},
  {'user_id': 3, 'product_id': 14, 'collection': '5', 'text_description': 'n1'},
  {'user_id': 3, 'product_id': 15, 'collection': '5', 'text_description': 'n1'}
]


def upload_dict_to_db(data, table_name):
    for row in data:
        columns = ', '.join(row.keys())
        placeholders = ', '.join(['%s'] * len(row))
        query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
        cursor.execute(query, list(row.values()))
    db.commit()

# upload_dict_to_db(locations, 'locations')
# upload_dict_to_db(login_list, 'login')
# upload_dict_to_db(user_list, 'users')
# upload_dict_to_db(products_list, 'products')
upload_dict_to_db(user_products_list, 'user_products')