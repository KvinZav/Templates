const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'});

const sendEmailAWS = async(data=null) => {
  
  const params = {
    Destination: { /* required */
      ToAddresses: [
        'kevinzavala132@gmail.com',
        /* more items */
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
         Charset: "UTF-8",
         Data: data || "<h1 style='color:red;'>Hello World brother</h1>"
        },
       },
       Subject: {
        Charset: 'UTF-8',
        Data: 'Email Test'
       }
      },
    Source: 'kevinzavala132@gmail.com', /* required */
  };

  const sendPromise = new AWS.SES().sendEmail(params).promise();

  sendPromise.then(console.log).catch(console.log)
  

}


const sendEmail = async() => {

    // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-2.amazonaws.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'AKIAWKGHKLUFDB3B2H5M', // generated ethereal user
      pass: 'BJG73nid5gN1a6fwDK+8zB1Qa+RyJCCYT0p4ytb6IFNi', // generated ethereal password
    },

  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'kevinzavala132@gmail.com', // sender address
    to: "kevinzavala132@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world!", // plain text body
    html: "<b>Hello world?</b>", // html body
    
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}

module.exports = {
  sendEmail,
  sendEmailAWS,
}