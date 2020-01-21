const Twit = require('twit');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Generate consumer key and access token in
 * https://twitter.com/apps
 */
const bot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 10000
});

// Make a tweet with code
// bot.post('statuses/update', { status: 'Hello world' }, function(
//   err,
//   data,
//   response
// ) {
//   if (err) {
//     console.error('[Error]-', err);
//   } else {
//     console.log(data.text + ' was tweeted.');
//   }
// });

// Get info related with our folowwers
// bot.get(
//   'followers/ids',
//   { scren_name: 'seto bot 🤖' },
//   (err, data, response) => {
//     if (err) {
//       console.error('[Error]-', err);
//     } else {
//       console.log(data);
//     }
//   }
// );

// bot.get(
//   'followers/list',
//   { scren_name: 'seto bot 🤖' },
//   (err, data, response) => {
//     if (err) {
//       console.error('[Error]-', err);
//     } else {
//       data.users.forEach(user => {
//         console.log(user.scren_name);
//       });
//       console.log(data);
//     }
//   }
// );

// Twitter stream
var stream = bot.stream('statuses/filter', { track: '#istandwithvirginia' });

stream.on('tweet', function(tweet) {
  console.log(tweet.id + '\n' + tweet.text + '\n' + tweet.user.id + '\n');

  bot.post('favorites/create', { id: tweet.id_str }, function(
    err,
    data,
    response
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log(data.text + ' has been liked.');
    }
  });

  // Reply to stream

  // bot.post(
  //   'statuses/update',
  //   {
  //     in_reply_to_status_id: tweet.id,
  //     status: '@' + tweet.user.screen_name + ' Hello world'
  //   },
  //   function(err, data, response) {
  //     if (err) {
  //       console.error('[Error]-', err);
  //     } else {
  //       console.log(data.text + ' was tweeted.');
  //     }
  //   }
  // );
});
