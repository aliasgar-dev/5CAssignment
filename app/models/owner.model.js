module.exports = (sequelize,Sequelize)=>{
  const owner = sequelize.define("owner", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
     },
     avatar_url:{
       type:Sequelize.STRING
     },
     html_url:{
       type:Sequelize.STRING
     },
     type:{
       type:Sequelize.STRING
     },
     site_admin:{
       type:Sequelize.BOOLEAN
     }
   })


  owner.associate= modals=>{
  	owner.belongsTo(modals.GithubUser,{
  		foreignKey:{
  			
  		}
  	})
  }
  return owner

}