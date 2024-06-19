import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    name :{
        type:String,
        require:true
    },
    contactNo:{
        type:Number,
    },
    // imageURL:{
    //      type:String,
    //      require:true
    // },
    address:{
        type:String
    },
    companyName:{
        type:String
    }

})

const User = mongoose.model('User', UserSchema);

export default User;