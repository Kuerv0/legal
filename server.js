/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const DATA_FILE = path.join(__dirname, 'data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/api/documents', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/documents', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const documents = JSON.parse(data);
    const newDocument = {
      title: req.body.title,
      description: req.body.description,
      id: req.body.id,
      elapsed: 0,
      runningSince: null,
    };
    documents.push(newDocument);
    fs.writeFile(DATA_FILE, JSON.stringify(documents, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(documents);
    });
  });
});

app.post('/api/documents/start', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const documents = JSON.parse(data);
    documents.forEach((document) => {
      if (document.id === req.body.id) {
        document.runningSince = req.body.start;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(documents, null, 4), () => {
      res.json({});
    });
  });
});

app.post('/api/documents/stop', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const documents = JSON.parse(data);
    documents.forEach((document) => {
      if (document.id === req.body.id) {
        const delta = req.body.stop - document.runningSince;
        document.elapsed += delta;
        document.runningSince = null;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(documents, null, 4), () => {
      res.json({});
    });
  });
});

app.put('/api/documents', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const documents = JSON.parse(data);
    documents.forEach((document) => {
      if (document.id === req.body.id) {
        document.title = req.body.title;
        document.description = req.body.description;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(documents, null, 4), () => {
      res.json({});
    });
  });
});

app.delete('/api/documents', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    let documents = JSON.parse(data);
    documents = documents.reduce((memo, document) => {
      if (document.id === req.body.id) {
        return memo;
      } else {
        return memo.concat(document);
      }
    }, []);
    fs.writeFile(DATA_FILE, JSON.stringify(documents, null, 4), () => {
      res.json({});
    });
  });
});

app.get('/molasses', (_, res) => {
  setTimeout(() => {
    res.end();
  }, 5000);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
