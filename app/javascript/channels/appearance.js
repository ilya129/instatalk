import consumer from "./consumer"

(function() {
  jQuery(document).on('turbolinks:load', function() {
    return App.room = App.cable.subscriptions.create({
      channel: "AppearanceChannel"
    }, {
      connected: function() {},
      disconnected: function() {},
      received: function(data) {
        var users;
        users = (data['users'].map(function(i) {
          return i['nickname'] + '';
        })).toString().replace(/,/g, ' ');
        return $('#users').text(users);
      }
    });
  });

}).call(this);
