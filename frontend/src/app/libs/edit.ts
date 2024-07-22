import axios from "axios";
import { title } from "process";
import { docType } from "./type";
import dotenv from "dotenv";
dotenv.config();
export async function createSem(name: string):Promise<boolean>{
    try{
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/sem/create',{
            semname: name
        });
       return response.data.success as boolean;
    }catch(err){
        return false;
    }
}
export async function deleteSem(name: string):Promise<boolean>{
    try{
        const response = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/sem/delete',{
            data:{semname: name}
        });
       return response.data.success as boolean;
    }catch(err){
        return false;
    }
}
export async function createSub(name: string, subject:string):Promise<boolean>{
    try{
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/subject/create',{
            semname: name,
            name:subject
        });
       return response.data.success as boolean;
    }catch(err){
        return false;
    }
}
export async function deleteSub(name: string, subject:string):Promise<boolean>{
    try{
        const response = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/subject/delete',{
            data:{semname: name,
            name: subject}
        });
       return response.data.success as boolean;
    }catch(err){
        return false;
    }
}
export async function createUnit(name: string, subject:string, unit:string):Promise<boolean>{
    try{
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/unit/create',{
            semname: name,
            subjectname: subject,
            title:unit
        });
       return response.data.success as boolean;
    }catch(err){
        return false;
    }
}
export async function deleteUnit(name: string, subject:string, unit:string):Promise<boolean>{
    try{
        const response = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/unit/delete',{
            data:{semname: name,
            subjectname: subject,
            title:unit}
        });
       return response.data.success as boolean;
    }catch(err){
        return false;
    }
}
export async function createMaterial(name: string, subject:string, unit:string, material:string,url:string,type:docType):Promise<boolean>{
    console.log(name)
    try{
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/material/create',{
            semname: name,
            subjectname: subject,
            unitname:unit,
            title:material,
            url:url,
            type:type
        });
       return response.data.success as boolean;
    }catch(err){
        return false;
    }
}
export async function deleteMaterial(name: string, subject:string, unit:string,material:string):Promise<boolean>{
    try{
        const response = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/material/delete',{
            data:{semname: name,
            subjectname: subject,
            unitname:unit,
            title:material
        }
        });
       return response.data.success as boolean;
    }catch(err){
        console.log(err);
        return false;
    }
}