import mongoose from 'mongoose';

async function dbConn(url){
    return await mongoose.connect(url);
}

export {dbConn};