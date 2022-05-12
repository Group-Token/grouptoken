const axios = require('axios');

module.exports = function (app, prisma) {
  const config = {
    headers: {
      "accept": "application/json",
      "X-API-KEY": process.env.MORALIS_API_KEY,
    },
  }

  const getTokenData = async (address) => {
    const response = await axios.get(`https://solana-gateway.moralis.io/nft/mainnet/${address}/metadata`, config);
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

  app.get('/api/v1/groups/:id', async (req, res) => {
    const group = await prisma.Group.findUnique({
      where: {
        id: BigInt(req.params.id),
      },
      include: {
        tokens: {
          include: {
            token: true,
          },
        },
      },
    });
    const tokens = [];
    for (groupToken of group.tokens) {
      const token = await getTokenData(groupToken.token.address)
      tokens.push(token);
    }
    group.tokens = tokens;
    res.json(group);
  });

  app.post('/api/v1/groups', async (req, res) => {
    const data = req.body;
    const group = await prisma.Group.create({
      data: {
        name: data.name,
        imageURL: data.imageURL,
        description: data.description,
        ownerId: BigInt(data.userId),
      }
    });

    for (address of data.tokenAddresses) {
      const token = await prisma.Token.upsert({
        where: {
          address: address,
        },
        update: {},
        create: {
          address: address,
        },
      });
      const groupToken = await prisma.GroupToken.create({
        data: {
          tokenId: token.id,
          groupId: group.id,
        }
      });
    }

    res.json({status: 'success', id: group.id});
  });
}