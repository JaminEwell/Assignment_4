/* eslint-disable linebreak-style */
/* global db print */
/* eslint no-restricted-globals: "off" */
/* eslint linebreak-style: ["error", "windows"] */
db.products.remove({});

const productsDB = [
  {
    id: 1,
    Category: 'Shirts',
    Price: 15,
    Name: 'T-Shirt',
    Image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    Category: 'Jeans',
    Price: 68,
    Name: 'Pants',
    Image: 'https://images.unsplash.com/photo-1611900376362-a996ff67f4d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=562&q=80',
  },
  {
    id: 3,
    Category: 'Jeans',
    Price: 189,
    Name: 'Shorts',
    Image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

db.products.insertMany(productsDB);
const count = db.products.count();
print('Inserted', count, 'products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });

// eslint-disable-next-line linebreak-style
db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ Name: 1 });
db.products.createIndex({ Category: 1 });
db.products.createIndex({ Price: 1 });
