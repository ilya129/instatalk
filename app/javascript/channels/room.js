import consumer from "./consumer"

(function() {
  var createRoomChannel, scroll_bottom;

  jQuery(document).on('turbolinks:load', function() {
    var messages;
    messages = $('#messages');
    if (messages.length > 0) {
      createRoomChannel(messages.data('room-id'));
      scroll_bottom();
    }
    return $(document).on('keypress', '#message_body', function(event) {
      var message;
      message = event.target.value;
      if (event.keyCode === 13) {
        if (message !== "") {
          App.room.speak(message);
          event.target.value = "";
          return event.preventDefault();
        } else {
          return event.preventDefault();
        }
      }
    });
  });

  scroll_bottom = function() {
    return messages.scrollTop = messages.scrollHeight;
  };

  createRoomChannel = function(roomId) {
    return App.room = App.cable.subscriptions.create({
      channel: "RoomChannel",
      roomId: roomId
    }, {
      connected: function() {
        return console.log('Connected to RoomChannel');
      },
      disconnected: function() {
        return console.log('Disconnected from RoomChannel');
      },
      received: function(data) {
        console.log('Received message: ' + data['message']);
        $('#messages').append(data['message']);
        return scroll_bottom();
      },
      speak: function(message) {
        return this.perform('speak', {
          message: message
        });
      }
    });
  };

}).call(this);
