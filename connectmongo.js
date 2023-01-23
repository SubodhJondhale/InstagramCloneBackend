const uri = `mongodb://subodhjondhale1998:Mubodh1234@ac-tczgbi3-shard-00-00.lqzz1z6.mongodb.net:27017,ac-tczgbi3-shard-00-01.lqzz1z6.mongodb.net:27017,ac-tczgbi3-shard-00-02.lqzz1z6.mongodb.net:27017/?ssl=true&replicaSet=atlas-fybxf3-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.set("strictQuery", true);
async function Connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongoDB successfully");
  } catch (e) {
    console.log(e.message);
  }
}
Connect();
mongoose.connect(uri, (err) => {
  if (err) {
    console.log("Connection to mongodb failed");
  } else console.log("Connected to mongoDB successfully");
});
