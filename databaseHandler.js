const { MongoClient, ObjectId } = require("mongodb");

const DATABASE_URL ="mongodb+srv://Potato:ducanh@potatoesz.bgsmt.mongodb.net/test";
const DATABASE_NAME ="WebDb"

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function getDocumentById(id, collectionName){
    const dbo = await getDatabase();
    const result = await dbo.collection(collectionName).findOne({_id: ObjectId(id)})
    return result;
}


//vi du obj la thong tin van insert, collection: ten cua bang can insert-vd Products
async function insertToDB(obj,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).insertOne(obj)
    console.log("Gia tri id moi duoc insert la: ", result.insertedId.toHexString());
}

async function getAll(collectionName){
    const dbo = await getDatabase();
    const result = await dbo.collection(collectionName).find({}).toArray();
    return result;
}

async function deleteObject(id,collectionName){
    const dbo = await getDatabase()
    await dbo.collection(collectionName).deleteOne({_id:ObjectId(id)})
}

async function updateById(id, updateValue, collectionName) {
    const dbo = await getDatabase();
    await dbo.collection(collectionName).updateOne({ _id: ObjectId(id)}, updateValue);
    console.log("Object Updated!");
}
module.exports = {insertToDB,getAll,deleteObject,getDocumentById,updateById};