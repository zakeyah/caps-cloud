'use strict';

const AWS = require('aws-sdk');
const faker = require('faker')


AWS.config.update({region:'us-east-1'});
const sns = new AWS.SNS();
const topicArn = 'arn:aws:sns:us-east-1:824237399864:sns';

setInterval(() => {
    const message = {
        orderId: faker.datatype.uuid(),
        customer: faker.name.findName(),
        vendorId: 'arn:aws:sqs:us-east-1:824237399864:queue2'
    }

    const payload = {
        Message: JSON.stringify(message),
        TopicArn: topicArn
    };

    sns.publish(payload).promise()
        .then(data => {
            console.log(data);
        })
        .catch(console.error);
}, 5000);


