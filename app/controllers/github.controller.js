const db = require("../models");
const Github = db.github;
const Op = db.Sequelize.Op;
const fetch_API = require('node-fetch')
const isAbsolute = require('is-absolute-url')
const async = require('async')


exports.create = async(req, res) => {
 
  if (!req.body.url) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  var url = req.body.url;
  if(isAbsolute(url)){
    try{
      const response = await fetch_API(url);
      var githubUserData = await response.json();

    }
    catch(e){
      res(e)
      return;
    }

  }
  
      async.mapSeries(githubUserData,saveEachInfo,function(err,result){
        console.log('----called----')
        if(err){
          res.send({
              message:
                err.message || "Some error occurred while saving info."
              });
        }
        else{
          res.send({result:"All data saved successfully"})

        }
      })

      function saveEachInfo(eachInfo,done){
        var obj = {};
        obj.id = eachInfo.id
        obj.name = eachInfo.name
        obj.html_url = eachInfo.html_url
        obj.description = eachInfo.description
        obj.created_at = eachInfo.created_at
        obj.open_issues = eachInfo.open_issues
        obj.watchers = eachInfo.watchers
        obj.owner = {}
        obj.owner.id = eachInfo.owner.id
        obj.owner.avatar_url = eachInfo.owner.avatar_url
        obj.owner.html_url = eachInfo.owner.html_url
        obj.owner.type = eachInfo.owner.type
        obj.owner.site_admin = eachInfo.owner.site_admin
        console.log('-------obj---',obj);
         Github.upsert(obj)
          .then(data => {
            done(null,data)
          })
          .catch(err => {
            console.log('----err--- sasving each info---',err)
            done(err,null)
          });
      }
};


exports.findAll = (req, res) => {
  console.log('-----req-----',req.params)
  var id = req.params.id ? req.params.id :null 
  

  Github.findAll({inclued:"owner"})
    .then(data => {
      // console.log('---data---',data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving github info."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Github.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Github ingo with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Github.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Github userinfo were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all gith info."
      });
    });
};

