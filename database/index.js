const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var Schema = mongoose.Schema;

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  owner: Schema.Types.Mixed,
  html_url: { type: String, index: true, unique: true } ,
  description: String,
  forks: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (allRepos /* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('in the save');
  allRepos.forEach( (eachRepo) => {
    eachRepo.name = new Repo(eachRepo);

    (eachRepo.name).save((err, document)=>{
      if (err) {
        return console.error(err);
      } else {
        return document;
      }
    });
  });
}

let find = (callback) => {

  Repo.find((err, storedRepos)=>{
    if (err) {
      callback(err);
    } else {
      console.log('storedRepos', storedRepos);
      callback(null, storedRepos);
    }
  }).limit(25).sort({forks: 1}).select({name: 1, 'owner.login': 1, html_url: 1, description: 1, forks: 1});
}

module.exports.save = save;
module.exports.find = find;
