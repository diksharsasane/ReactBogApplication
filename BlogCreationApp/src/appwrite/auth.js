//service class
import conf from '../conf/conf.js';
import {Client, Account,ID} from "appwrite";

export class AuthService {
    client= new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){

                //call another account
                return this.login({email,password});
                //return userAccount;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            //throw error;
            console.log("Apprite error in getCurrentUser method"+error);   
        }
        return null;
    }

    async logout(){
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService();

export default authService;
