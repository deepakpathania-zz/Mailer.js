# Mailer
- A JS script to recieve mails at your email id of form submissions from any website.

# Quick start
- Clone this repository to your local machine.
- Move to this repository and do <code>npm install --save</code> to install and save dependencies.
- Open index.js and make the following configuration changes.
```javascript
  if(origin=="http://randomsite.com" || origin=="https://randomsite.com" || origin == "randomsite.com")
```
- Change the origin value to all the sites you want to accept requests from.

```javascript
var transporter = nodemailer.createTransport('smtps://abc@gmail.com:password123@smtp.gmail.com');
```
- Change the email id and password field here from abc@gmail.com and password123 to valid email id and password which you'll use to send mails.

```javascript
var mailOptions = {
        from: '"'+request.body.username+'" <'+request.body.email+'>',// sender address 
        to: 'yourid@gmail.com', // list of receivers ,change id here to set receiver id
        text: "From : " + " " + request.body.username + " " +request.body.msg + "His id : " + request.body.email, // plaintext body  
        subject: 'New response from contact form  by : ✔' + request.body.username // Subject line 
    };
```
- Configure mail options to specify list of receivers and body of the email you want to recieve. Make sure these(request.body.element) exist in your request's name attribute. For example, the above configuration works for a form that looks like this with the following post request : 

```html
<form id="contact-form">
  <div>
    <input type="text" name="contactName" id="contact-name">
    <label class="input-label" for="contact-name">Name</label>
  </div>
  <div>
     <input type="email" name="contactEmail" id="email">
     <label class="input-label" for="email">Email</label>
  </div>
  <div>
      <textarea name="contactMessage" id="textarea1"></textarea>
      <label class="input-label" for="textarea1">Message</label>
  </div>
  <button class="submit-btn" type="button">send message</button>
</form>
```

```javascript
$(".submit-btn").click(function(e) {
        if($('#contact-name').val() == "" || $('#email').val()==""|| $('#textarea1').val()=="" || !$("#contact-form")          [0].checkValidity()) {
            window.alert("Incomplete data", "Please fill out all the fields correctly. Thanks :)");
        }
        else {
          $.post(
              'https://your-app-name.herokuapp.com/', 
              {
                username: $('#contact-name').val(),
                email: $('#email').val(),
                msg: $('#textarea1').val()
              }, 
              function(res) {
                console.log(res);
                  $('#contact-name').val("");
                  $('#email').val("");
                  $('#textarea1').val("");
                if(res.success==0) {
                 window.alert("Reach out directly at youremailid@gmail.com. Sorry for inconvenience");
                }
                else {
                  window.alert("Thanks!", "I'll reach out to you as soon as I can.!");
                }
              }
          );
      	}
      });
```

- Now let us push your mailer script to heroku. Use the following set of commands to do so. More information here. <code>https://devcenter.heroku.com/articles/deploying-nodejs</code>
```
npm init
git init
git add .
git commit -m "Mailer v0.1"
heroku login
heroku create
git push heroku master
```

- If everything went well, you should now have a heroku url where your script is deployed. Replace that url with the <code>https://your-app-name.herokuapp.com/</code> in the POST request.

- And you are good to go. Create a submit button in your form, set correct attributes in both the request and the request.body.element in form and script respectively, bind this post request to the submit button of your form and you should receive the submmited form data in your id.

