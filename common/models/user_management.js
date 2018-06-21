'use strict';
var config = require('../../server/config.json');
var path = require('path');
//var senderAddress = "ahameedijaz78@gmail.com"; //Replace this address with your actual address

module.exports = function(Usermanagement) {

  //send verification email after registration
 Usermanagement.afterRemote('create', function(context, user, next) {
  // console.log('> Usermanagement.afterRemote triggered');

   var options = {
     type: 'email',
     to: user.email,
     from: 'testmidcities@gmail.com',
     subject: 'Thanks for registering.',
     template: path.resolve(__dirname, '../../server/views/verify.ejs'),
     redirect: '/verified',
     user: Usermanagement
   };
   user.verify(options, function(err, response) {
       if (err) {
         Usermanagement.deleteById(user.id);
         return next(err);
       }
       context.res.render('response', {
         title: 'Signed up successfully',
         content: 'Please check your email and click on the verification link ' +
             'before logging in.',
         redirectTo: '/',
         redirectToLinkText: 'Log in'
       });
     });
 });

 // Method to render
 Usermanagement.afterRemote('prototype.verify', function(context, user, next) {
   context.res.render('response', {
     title: 'A Link to reverify your identity has been sent '+
       'to your email successfully',
     content: 'Please check your email and click on the verification link '+
       'before logging in',
     redirectTo: '/',
     redirectToLinkText: 'Log in'
   });
 });

}
