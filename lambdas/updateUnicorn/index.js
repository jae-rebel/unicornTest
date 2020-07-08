const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
	const params = {
		TableName: 'unicorn',
		Key: {
			name: event.name,
		},
		UpdateExpression: 'set place = :place',
		ExpressionAttributeValues: {
			':place': event.place,
		},
		ReturnValues: 'ALL_NEW',
	};

	let res = await dynamodb.update(params).promise();
	return res;
};
