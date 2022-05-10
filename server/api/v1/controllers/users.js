const { faker } = require('@faker-js/faker');
const axios = require('axios');

module.exports = function (app, prisma) {
  const config = {
    headers: {
      "accept": "application/json",
      "X-API-KEY": process.env.MORALIS_API_KEY,
    },
  }

  const createUser = async (publicKey) => {
    const response = axios.get(`https://solana-gateway.moralis.io/account/mainnet/${publicKey}/portfolio`, config);
    const user = await prisma.User.create({
      data: {
        publicKey: publicKey,
        username: `${faker.word.adjective()}${faker.animal.type()}`,
        imageURL: `https://avatars.dicebear.com/api/big-ears/${publicKey}.png`,
      }
    });
    return user
  }

  const getTokens = async (publicKey) => {
    const response = await axios.get(`https://solana-gateway.moralis.io/account/mainnet/${publicKey}/portfolio`, config);
    const tokens = [];

    for (nft of response.data.nfts) {
      const token = await getTokenData(nft);
      tokens.push(token);
    }
    
    return tokens;
  }

  const getTokenData = async (token) => {
    const response = await axios.get(`https://solana-gateway.moralis.io/nft/mainnet/${token.mint}/metadata`, config);
    const data = response.data;
    const standard = data.standard;
    const metadataURI = data[standard]['metadataUri'];
    const nft = await getTokenMetadata(metadataURI);
    nft.address = data.mint;
    return nft;
  }

  const getTokenMetadata = async (metadataURI) => {
    const tokenMetadata = await axios.get(metadataURI);
    const nft = {
      name: tokenMetadata.data.name,
      imageURL: tokenMetadata.data.image,
      description: tokenMetadata.data.description,
    }
    return nft;
  }

  app.get('/api/v1/users/:publicKey', async (req, res) => {
    const user = await prisma.User.findUnique({
      where: {
        publicKey: req.params.publicKey,
      }
    });
    if (!user) {
      user = await createUser(req.params.publicKey);
    }
    user.tokens = await getTokens(req.params.publicKey);

    res.json(user);
  });
}
