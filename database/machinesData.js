export default {
  data: {
    status: 200,
    message: 'success',
    error: null,
    groups: [
      {
        id: 1,
        name: 'electronics',
        machines: [
          {
            id: 1,
            name: 'Phone Screen',
            status: 'on',
            groupId: 1,
            description: 'This is a phone screen',
            products: [
              {
                id: 1,
                name: 'iPhone 6',
                price: 600,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone 6 screen'
              },
              {
                id: 2,
                name: 'iPhone 6 Plus',
                price: 700,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone 6 Plus screen'
              },
              {
                id: 3,
                name: 'iPhone 6s',
                price: 700,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone 6s screen'
              },
              {
                id: 4,
                name: 'iPhone 6s Plus',
                price: 800,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone 6s Plus screen'
              },
              {
                id: 5,
                name: 'iPhone 7',
                price: 800,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone 7 screen'
              },
              {
                id: 6,
                name: 'iPhone 7 Plus',
                price: 900,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone 7 Plus screen'
              },
              {
                id: 7,
                name: 'iPhone 8',
                price: 900,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone 8 screen'
              },
              {
                id: 8,
                name: 'iPhone 8 Plus',
                price: 1000,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone 8 Plus screen'
              },
              {
                id: 9,
                name: 'iPhone X',
                price: 1000,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone X screen'
              },
              {
                id: 10,
                name: 'iPhone XS',
                price: 1100,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone XS screen'
              },
              {
                id: 11,
                name: 'iPhone XS Max',
                price: 1200,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone XS Max screen'
              },
              {
                id: 12,
                name: 'iPhone XR',
                price: 1100,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone XR screen'
              },
              {
                id: 13,
                name: 'iPhone 11',
                price: 1200,
                quantity: 10,
                machine: 1,
                description: 'This is an iPhone 11 screen'
              }
            ]
          },
          {
            id: 2,
            name: 'Phone Button',
            status: 'off',
            groupId: 1,
            description: 'This is a phone button',
            products: [
              {
                id: 14,
                name: 'iPhone 6',
                price: 600,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone 6 button'
              },
              {
                id: 15,
                name: 'iPhone 6 Plus',
                price: 700,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone 6 Plus button'
              },
              {
                id: 16,
                name: 'iPhone 6s',
                price: 700,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone 6s button'
              },
              {
                id: 17,
                name: 'iPhone 6s Plus',
                price: 800,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone 6s Plus button'
              },
              {
                id: 18,
                name: 'iPhone 7',
                price: 800,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone 7 button'
              },
              {
                id: 19,
                name: 'iPhone 7 Plus',
                price: 900,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone 7 Plus button'
              },
              {
                id: 20,
                name: 'iPhone 8',
                price: 900,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone 8 button'
              },
              {
                id: 21,
                name: 'iPhone 8 Plus',
                price: 1000,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone 8 Plus button'
              },
              {
                id: 22,
                name: 'iPhone X',
                price: 1000,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone X button'
              },
              {
                id: 23,
                name: 'iPhone XS',
                price: 1100,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone XS button'
              },
              {
                id: 24,
                name: 'iPhone XS Max',
                price: 1200,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone XS Max button'
              },
              {
                id: 25,
                name: 'iPhone XR',
                price: 1100,
                quantity: 10,
                machine: 2,
                description: 'This is an iPhone XR button'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'clothes',
        machines: [
          {
            id: 3,
            name: 'Shirt',
            status: 'on',
            groupId: 2,
            description: 'This is a  shirt machine',
            products: [
              {
                id: 26,
                name: 'Shirt Green',
                price: 20,
                quantity: 10,
                machine: 3,
                description: 'This is a green shirt'
              },
              {
                id: 27,
                name: 'Shirt Pink',
                price: 30,
                quantity: 10,
                machine: 3,
                description: 'This is a pink shirt'
              },
              {
                id: 28,
                name: 'Shirt Grey',
                price: 10,
                quantity: 10,
                machine: 3,
                description: 'This is a grey shirt'
              },
              {
                id: 29,
                name: 'Shirt White',
                price: 50,
                quantity: 10,
                machine: 3,
                description: 'This is a white shirt'
              }
            ]
          },
          {
            id: 4,
            name: 'Pants',
            status: 'off',
            groupId: 2,
            description: 'This is a pants machine',
            products: [
              {
                id: 30,
                name: 'Blue Jeans',
                price: 20,
                quantity: 10,
                machine: 4,
                description: 'This is a blue jeans'
              },
              {
                id: 31,
                name: 'Gabardine',
                price: 30,
                quantity: 10,
                machine: 4,
                description: 'This is a gabardine'
              },
              {
                id: 32,
                name: 'Shorts',
                price: 10,
                quantity: 10,
                machine: 4,
                description: 'This is a shorts'
              },
              {
                id: 33,
                name: 'Fabric Pants',
                price: 50,
                quantity: 10,
                machine: 4,
                description: 'This is a Fabric Pants'
              }
            ]
          }
        ]
      }
    ]
  }
};
