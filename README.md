# Github Profile Stats

Log and/or get notified when someone views your Github profile

## How does it work?

Using an express web server, it will serve an transparent image while also returning also processing the request headers
to verify it's a real view and locate the viewer by country.

## Getting started

<p>
  Run 'npm i' to install the deps
</p>
<p>
  Run npm start to start the server
</p>
<p>
  Add an image to your profile mardown file with the same path as your web server
</p>
<p>
  If you want to use the default Telegram bot example, you will need to create a telegram bot here
  https://telegram.me/BotFather
</p>
<p>
 Create a group chat and add your bot to it as well as this bot (https://t.me/getidsbot)
</p>
<p>
  Create a .env file with the values "CHAT_ID" & "BOT_KEY" and assign them with the values you get from the previous two steps
</p>
<p>
  If you dont want to use the Telegram example, you already know what your going to do! Don't forget to delete the Telegram code block as well
  as its imports.
</p>
