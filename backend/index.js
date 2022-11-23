const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://test-app:t1YsHY6oEzMmBlUi@cluster0.f0kggkj.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri);
client.connect().then(( ) => console.log("connected to db"))
                .catch((err) => console.log(err))

async function insert(newItem) {
  try {
    const db = client.db("HW7");
    const collection = db.collection("HW7");
    const res = await collection.insertOne(newItem);
    console.log("INSERTION_RES: ", res);
  } catch (err) {
    console.log("INSERTION_ERR: ", err);
  }
}

async function find(filterObj) {
  let returnArr = []
  
  const db = client.db("HW7")
  const collection = db.collection("HW7")
  const cursor = collection.find();

  await cursor.forEach(doc => returnArr.push(doc))
  return returnArr;
  
}

async function deleteBlog(query) {
  const db = client.db("HW7")
  const collection = db.collection("HW7")
  const result = await collection.deleteOne(query);
  console.log(result)
  return result.deletedCount;
}

async function update(query, message) {
  const db = client.db("HW7")
  const collection = db.collection("HW7")
  const result = await collection.updateOne(query, {
    $set: {
      message: message
    }
  })
  console.log(
    `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  );
}


app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello! Navigate to any of the tabs to start!");
})

app.post("/blog/create-post", (req, res) => {
  console.log("[POST] resource addition/updation requested")
  insert(req.body)
})

app.get("/blog", async (req, res) => {
  console.log("[GET] resource requested from /view endpoint")
  const a = await find();
  res.send(a)
})

app.post("/login", async(req, res) => {
  console.log("[POST] Login attempted")
  const { password } = req.body;
  console.log(password) 
  if (password === 'password') {
    res.send(req.body)
  }
})

app.post("/delete", async(req, res) => {
  console.log("[POST] resource deletion requested");
  const { _id, message } = req.body;
  const query = { _id: ObjectId(_id) };
  const result = deleteBlog(query);
  res.send("successfully deleted") 
})

app.post("/update", async(req, res) => {
  console.log("[POST] resource update requested");
  const { _id, message } = req.body;
  const query = { _id: ObjectId(_id) }
  update(query, message)
  res.send("sucessfully deleted")
})

app.listen(port, () => {console.log("Listening on port: " + port)})