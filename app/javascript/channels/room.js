import consumer from "./consumer"

let subscription = {};

$(document).on("turbolinks:load", function () {
  let messages = $('#messages');

  if (Object.keys(subscription).length && messages.length > 0) {
    subscription.disconnected(subscription);
  };

  if (Object.keys(subscription).length) {
    App.cable.subscriptions.remove(subscription);
  };

  if (messages.length > 0) {
    createRoomChannel(messages.data('room-id'))
    scroll_bottom();
  };
});

$(document).on("keypress", "#message_body", function (event) {
  let message = event.target.value;

  if (event.keyCode == 13 && message != '') {
    App.room.speak(message);
    event.target.value = '';
  };
  if (event.keyCode == 13) {
    event.preventDefault();
  };
});

const scroll_bottom = () => {
  messages.scrollTop = messages.scrollHeight;
};

const createRoomChannel = roomId => {
  App.room = App.cable.subscriptions.create({
    channel: "RoomChannel",
    roomId: roomId
  }, {
    connected: function() {
      console.log('Connected to RoomChannel');
    },
    disconnected: function() {
      console.log('Disconnected from RoomChannel');
    },
    received: function(data) {
      console.log('Received message: ' + data['message']);
      $('#messages').append(data['message']);
      scroll_bottom();
    },
    speak: function(message) {
      this.perform('speak', {
        message: message
     });
    }
  });
  subscription = App.room;
};

