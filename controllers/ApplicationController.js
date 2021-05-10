const fs = require("fs");

const data = {
  files: [],
};

exports.save = (req, res) => {
  const title = req.body.name;
  const text = req.body.text;

  const sameName = data.files.find(({ name }) => name === title);
  const index = data.files.indexOf(sameName);
  const date = new Date().toLocaleDateString("pl-PL");

  if (index > -1) {
    data.files[index].text = text;
    data.files[index].date = date;
  } else {
    data.files.unshift({ name: title, text: text, date: date });
  }

  const json = JSON.stringify(data, null, 2);
  fs.writeFile(
    `saved/saved.json`,
    json,
    "utf8",
    err => err && console.log(err)
  );
  res.redirect("/");
};

exports.read = (req, res) => {
  fs.readFile("saved/saved.json", "utf8", (err, data) => {
    err ? console.log(err) : res.send(data);
  });
};
