module.exports = (sequelize, Sequelize) => {
  const GithubUser = sequelize.define("githubUser", {
    id: {
      type: Sequelize.INTEGER,
       primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    open_issues: {
      type: Sequelize.INTEGER
    },
    html_url: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.STRING
    },
    watchers: {
      type: Sequelize.INTEGER
    }
  },
    {
      freezeTableName:true
    })
  GithubUser.assocate = modals =>{
    GithubUser.hasOne(modals.owner,{
      onDelete:"Cascade"
    })
    
  }
  return GithubUser;
};

