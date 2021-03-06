$(document).ready(function () {
  const socket = io.connect('http://localhost:3000', {
    forceNew: true,
  });

  let ready = false;

  let userInfo;

  $('#form').submit(function (e) {
    e.preventDefault();

    const password = e.currentTarget.password.value;
    const email = e.currentTarget.email.value;

    const data = {
      email,
      password,
    };

    $.ajax({
      url: '/sessions',
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      // dataType: "json"
    })
      .then(userData => {
        userInfo = userData;

        $('#login').fadeOut();
        $('#chat').fadeIn();

        const time = new Date();

        $('#name').html(userInfo.user.name);
        $('#time').html(`First login: ${time.getHours()}:${time.getMinutes()}`);

        ready = true;

        socket.emit('join', {
          name: userInfo.user.name,
          token: userInfo.token,
        });
      })
      .catch(err => {
        console.log(err);
        $('#error_message').removeAttr('hidden');
      });
  });

  $('#textarea').keypress(function (e) {
    // press enter
    if (e.which == 13) {
      const text = $('#textarea').val();
      $('#textarea').val('');

      const time = new Date();

      $('.chat').append(
        `<li class="self"><div class="msg"><span>${
          userInfo.user.name
        }:</span><p>${text}</p><time>${time.getHours()}:${time.getMinutes()}</time></div></li>`,
      );

      if (text.trim().startsWith('/stock=')) {
        const [, stockName] = text.trim().split('/stock=');

        socket.emit('stock_api', {
          stockName,
          name: userInfo.user.name,
          token: userInfo.token,
        });
      } else {
        socket.emit('send', {
          text,
          name: userInfo.user.name,
          token: userInfo.token,
        });
      }

      // automatically scroll down
      document.getElementById('bottom').scrollIntoView();
    }
  });

  // listeners from open socket - from backend

  socket.on('update', function (msg) {
    if (ready) {
      $('.chat').append(`<li class="info">${msg}</li>`);
      document.getElementById('bottom').scrollIntoView();
    }
  });

  socket.on('chat', function (client, msg) {
    if (ready) {
      const time = new Date();
      $('.chat').append(
        `<li class="field"><div class="msg"><span>${client}:</span><p>${msg}</p><time>${time.getHours()}:${time.getMinutes()}</time></div></li>`,
      );

      document.getElementById('bottom').scrollIntoView();
    }
  });

  socket.on('initial_messages', function (messages) {
    if (ready) {
      messages.forEach(msg => {
        const time = new Date(msg.created_at);

        const { message, user: client } = msg;

        const elementClass = userInfo.user.id === client ? 'self' : 'field';

        $('.chat').append(
          `<li class=${elementClass}><div class="msg"><span>${client.name}:</span><p>${message}</p><time>${time.getHours()}:${time.getMinutes()}</time></div></li>`,
        );
      });

      document.getElementById('bottom').scrollIntoView();
    }
  });

  socket.on('stock_bot', function (stockPriceMessage) {
    if (ready) {
      const time = new Date();
      const client = 'STOCK_BOT';

      $('.chat').append(
        `<li class="field"><div class="msg"><span>${client}:</span><p>${stockPriceMessage}</p><time>${time.getHours()}:${time.getMinutes()}</time></div></li>`,
      );

      document.getElementById('bottom').scrollIntoView();
    }
  });
});
