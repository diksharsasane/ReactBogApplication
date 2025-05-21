//service class
import conf from '../conf/conf.js';
import {Client, Databases,Storage,Query,ID} from "appwrite";

export class Service{
    client = new Client();
    databbases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databbases=new Databases(this.client);
        this.bucket= new Storage(this.client);
    }


    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databbases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }// what we are creating..
            )
        } catch (error) {
            console.log("Appwrite createpost Error:"+error);
            
        }
    }

    async updatePost({slug,title,content,featuredImage,status}){
        try {
            return await this.databbases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,  //what we update
                {
                    title,
                    content,   
                    featuredImage,
                    status
                }  //  what are we updating
            )
        } catch (error) {
            console.log("Appwrite UpdatePost Error:"+error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databbases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                
            )
            return true;
        } catch (error) {
            console.log("Appwrite deletepost Error:"+error);
            return false
        }
    }

    async getPost(slug){
        try {
            await this.databbases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrie getPost Error:"+error);
            return false;
        }
    }

    async getPosts(queries =[Query.equal("status","active")]){
        try {
            return await this.databbases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
               // [] ===> we can write as well instead of above
                queries

            )
        } catch (error) {
            console.log("Appwrie getPosts Error:"+error);
            return false;
        }
    }

    //file upload services

    async uploadFile(file){
        try {
            await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            return true;
        } catch (error) {
            console.log("Appwrite uploadFile issue:"+error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite deleteFile issue:"+error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

