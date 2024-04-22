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

def update_field(table_name, field, value, condition_field, condition_value):
    query = f"UPDATE {table_name} SET {field} = %s WHERE {condition_field} = %s"
    cursor.execute(query, (value, condition_value))
    db.commit()


# upload_dict_to_db(locations, 'locations')
# upload_dict_to_db(login_list, 'login')
# upload_dict_to_db(user_list, 'users')
# upload_dict_to_db(products_list, 'products')
# upload_dict_to_db(user_products_list, 'user_products')

# update products images
ids = list(range(1, 16))
# urls = [
#     "https://tudosobrecachorros.com.br/wp-content/uploads/cachorros-fofos-03.jpg.webp",
#     "https://ciadobicho.com.br/wp-content/uploads/2023/11/Papel-de-Parede-para-Celular-de-Cachorro-Fofo-115.png",
#     "https://static.demilked.com/wp-content/uploads/2015/06/funny-playful-expressive-dog-portraits-elke-vogelsang-9.jpg",
#     "https://media.istockphoto.com/id/1516373695/photo/headshot-portrait-of-cute-funny-dog-jack-russell-terrier.jpg?b=1&s=612x612&w=0&k=20&c=mXkzgxpQoQLzyfmEnTOeevtZT3dMoi6nuhIfYltuwyc=",
#     "https://static.demilked.com/wp-content/uploads/2015/06/funny-playful-expressive-dog-portraits-elke-vogelsang-1.jpg",
#     "https://img.freepik.com/premium-photo/3d-illustration-cute-adorable-puppy-dog-portrait-with-studio-lighting-plain-background_710157-79.jpg",
#     "https://i.pinimg.com/736x/4c/5f/4f/4c5f4f4249a0e458150485dcab3885aa.jpg",
#     "https://i.pinimg.com/736x/43/e0/a7/43e0a7d763596794a2ec2782ed364fde.jpg",
#     "https://images.fineartamerica.com/images-medium-large-5/portrait-of-cute-cat-ozcan-malkocer.jpg",
#     "https://i1.wp.com/www.irishaspetportraits.co.uk/wp-content/uploads/2021/09/IMG_6565-e1630930724709.jpg?fit=500%2C700&ssl=1",
#     "https://media.posterlounge.com/img/products/650000/649927/649927_poster.jpg",
#     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTC80l2AK3aEr6zJJH164riy9SsR39dBtexS7UUV0ZFQ&s",
#     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffCHBNf-4oR77829PZlK_bJU7uL-tdN83PK-Vhf5ZlA&s",
#     "https://twpark.com/wp-content/uploads/2022/10/Tanganyika_Alpaca_2021_CS2-683x1024.jpg",
#     "https://cards.scryfall.io/normal/front/a/4/a4410076-e1fe-45f3-a0ca-a91ab0133ff4.jpg?1686967642",
# ]
urls = [
    "https://i.ibb.co/KbLvGZG/Spike-besta.jpg",
    "https://i.ibb.co/sqfrvcz/Spike-Dwarf.jpg",
    "https://i.ibb.co/WBYZLrL/Spike-Food.jpg",
    "https://i.ibb.co/hctJYWj/Spike-Human-Soldier.jpg",
    "https://i.ibb.co/sqvw26X/Spike-Human.jpg",
    "https://i.ibb.co/d71d3HK/Spike-Insect.jpg",
    "https://i.ibb.co/RhPPdPK/Spike-Kobolds-of-Khers-Keep.jpg",
    "https://i.ibb.co/7txPjj3/Spike-Myr.jpg",
    "https://i.ibb.co/Twf5HMC/Spike-Plant.jpg",
    "https://i.ibb.co/ZMXMNkm/Spike-Treasure.jpg ",
    "https://static.demilked.com/wp-content/uploads/2015/06/funny-playful-expressive-dog-portraits-elke-vogelsang-1.jpg",
    "https://static.demilked.com/wp-content/uploads/2015/06/funny-playful-expressive-dog-portraits-elke-vogelsang-9.jpg",
    "https://media.istockphoto.com/id/1516373695/photo/headshot-portrait-of-cute-funny-dog-jack-russell-terrier.jpg?b=1&s=612x612&w=0&k=20&c=mXkzgxpQoQLzyfmEnTOeevtZT3dMoi6nuhIfYltuwyc=",
    "https://ciadobicho.com.br/wp-content/uploads/2023/11/Papel-de-Parede-para-Celular-de-Cachorro-Fofo-115.png",
    "https://cards.scryfall.io/normal/front/a/4/a4410076-e1fe-45f3-a0ca-a91ab0133ff4.jpg?1686967642",
]

for i in range(len(ids)):
    update_field('products', 'image', urls[i], 'product_id', ids[i])


cursor.close()
db.close()