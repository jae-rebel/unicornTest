const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
	const params = {
		TableName: 'unicorn',
	};

	let res = await dynamodb.scan(params).promise();
	console.log(res.Items);

	return res.Items;
};
