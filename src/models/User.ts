
import mongoose, { Schema, Document } from "mongoose";

//Definicao de interface do usuario 

 interface IUser extends Document {
    email : string;
    password : string;
    createdAt : Date;
    updatedAt : Date;
}

//Criando esquema do usuario    

const UserSchema : Schema = new Schema(
    {
    email : { type : String, required : true, unique : true },
    password : { type : String, required : true },
    },
    { timestamps: true }
)

//criando modelo do usuario

const User = mongoose.model<IUser>('User', UserSchema);

export default User; //exportando modelo do usuario
        