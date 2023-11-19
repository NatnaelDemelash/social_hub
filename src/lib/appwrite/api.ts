import {ID} from 'appwrite'
import { INewUser } from "@/Types";
// import { account, avatars } from "./config";
import {Client, Account, Databases, Storage, Avatars} from 'appwrite';

const config = {
  projectID : import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_ENDPOINT,
  databseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  svaesCollectionId:import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  usersCollectionId:import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  storageId:import.meta.env.VITE_APPWRITE_STORAGE_ID
}

const client = new Client();

client.setEndpoint(config.url)
client.setProject(config.projectID)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storages = new Storage(client);


// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if(!newAccount) throw Error;
     
     const avatarUrl =  avatars.getInitials(user.name)

     const newUser = await saveUserToDb({
          accountID: newAccount.$id,
          name:newAccount.name,
          email: newAccount.email,
          userName: user.username,
          imageURL:avatarUrl
     })

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ============================== SAVE USERS TO DB
async function  saveUserToDb(user: {
  accountID: string,
  name:string,
  email: string,
  imageURL: URL,
  userName?:string
}) {
  try{
    const newUser = await databases.createDocument(
      config.databseId,
      config.usersCollectionId,
      ID.unique(),
      user,
    )

    return newUser
  }catch (error){
    console.log(error);
  }
}

