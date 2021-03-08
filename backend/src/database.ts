import { connect } from 'mongoose'

export async function startConnection() {
    const db = await connect('mongodb+srv://mongo:Hola1234@cluster0.eloh1.mongodb.net/db?',{
        useNewUrlParser: true,
        useFindAndModify: false 
    });
    console.log('Database is connected');
}