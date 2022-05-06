const { faker } = require('@faker-js/faker');
const axios = require('axios');

module.exports = function (app, prisma) {
  app.get('/api/v1/users/:publicKey', (req, res) => {
    prisma.User.findUnique({
      where: {
        publicKey: req.params.publicKey,
      }
    }).then(
      (user) => {
        res.json(user);
      }
    ).catch(
      (err) => {
        console.log(err);
        res.status(404).json({ message: "User not found" });
      }
    );
  });

  app.post('/api/v1/users', (req, res) => {
    const config = {
      headers: {
        "accept": "application/json",
        "X-API-KEY": process.env.MORALIS_API_KEY,
      },
    }
    axios.get(`https://solana-gateway.moralis.io/account/mainnet/${req.body.publicKey}/portfolio`, config).then(
      (response) => {
        prisma.User.create({
          data: {
            publicKey: req.body.publicKey,
            username: `${faker.word.adjective()}${faker.animal.type()}`,
            imageURL: `https://avatars.dicebear.com/api/big-ears/${req.body.publicKey}.png`,
          }
        }).then(
          (user) => {
            const portfolio = response.data;
            
            portfolio.nfts.forEach((token) => {
              prisma.Token.upsert({
                where: {
                  address: token.associatedTokenAddress,
                },
                update: {
                  ownerAddress: user.publicKey,
                },
                create: {
                  address: token.associatedTokenAddress,
                  ownerAddress: user.publicKey,
                }
              });
            });
            
            res.json(user);
          }
        ).catch(
          (err) => {
            console.log(err);
          }
        )
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  });
}
