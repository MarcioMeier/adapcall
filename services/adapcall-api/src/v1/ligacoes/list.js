const dynamo = require('../../lib/dynamo');

module.exports.run = async event => {
  try {
      
    const ligacoes = await new dynamo().scan();
    return {
      statusCode: 200,
      body: JSON.stringify({
          ligacoes
      })
    };
  
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
        message: 'deu ruim!'
      })
    }
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};