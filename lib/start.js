const events = require('@slack/client').RTM_EVENTS;

exports.matcher = /^\!start$/;
exports.callback = function (route, message, response) {
  if (message.channel in this.currentGames) {
    return response('A game has already been started! Use `!stop` to end the game.');
  }
  this.currentGames[message.channel] = {
    players: {}
  };
  response('<!here> Game Started! Respond with `!in` to join.');

  this.emit(events.MESSAGE, Object.assign({}, message, { text: '!in' }));
};