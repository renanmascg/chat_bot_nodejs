$(document).ready(function () {
  const socket = io.connect('http://localhost:3333');
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
        socket.emit('join', userInfo.user.name);
      })
      .catch(err => {
        console.log(err);
        $('#error_message').removeAttr('hidden');
      });
  });

  $('#textarea').keypress(function (e) {
    if (e.which == 13) {
      const text = $('#textarea').val();
      $('#textarea').val('');
      const time = new Date();
      $('.chat').append(
        `<li class="self"><div class="msg"><span>${$(
          '#nickname',
        ).val()}:</span><p>${text}</p><time>${time.getHours()}:${time.getMinutes()}</time></div></li>`,
      );

      socket.emit('send', text);
      // automatically scroll down
      document.getElementById('bottom').scrollIntoView();
    }
  });

  socket.on('update', function (msg) {
    if (ready) {
      $('.chat').append(`<li class="info">${msg}</li>`);
    }
  });

  socket.on('chat', function (client, msg) {
    if (ready) {
      const time = new Date();
      $('.chat').append(
        `<li class="field"><div class="msg"><span>${client}:</span><p>${msg}</p><time>${time.getHours()}:${time.getMinutes()}</time></div></li>`,
      );
    }
  });
});
