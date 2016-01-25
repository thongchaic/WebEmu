var tty = require('tty.js');

var app = tty.createServer({
  shell: 'shell',
  users: {
    foo2: 'bar2'
  },
  port: 80
});

app.get('/foo2', function(req, res, next) {
  res.send('bar');
});

app.listen();
