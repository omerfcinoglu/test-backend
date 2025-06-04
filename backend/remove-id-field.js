// remove-id-field.js
require('dotenv').config();
const mongoose = require('mongoose');
const Member = require('./models/Members');

async function run() {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const result = await Member.updateMany({}, { $unset: { id: "" } });
    console.log(`Güncellenen döküman sayısı: ${result.modifiedCount}`);

    await mongoose.disconnect();
}

run().catch(console.error);
