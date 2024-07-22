import { sem, subject, unit, material, alldata } from "./type"
import axios from "axios"
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import dotenv from "dotenv";
dotenv.config();
type JwtPayload={
    id:string,
    name: string,
    material:Array<string>
}


export const getUser = (token:string):JwtPayload|null=>{
    try {
        const user = jwtDecode<JwtPayload>(token);
            if(user){
                return user;
            }else{
                 return null;
            }
    } catch (error) {
        return null;
    }
}
export const admin = async(formdata:FormData):Promise<{success:boolean,message:string}>=>{
    const token = formdata.get('token');
    try{
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/user/admin',{token:token});
      return response?.data;
    }catch(error){
        type CustomError = {
            message: string;
            response: {
              data: {
                message: string;
              };
            };
          };
        const err = error as CustomError;
        return {success:false,message:err.response.data.message};
    }
}
export async function getsem ():Promise<sem[]|null>{
    try {
    const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+"api/v1/sem/getall",{
        withCredentials:true,
    });
    return response?.data.message
    } catch (error) {
        return null
    }
}
export async function getSubject(sem: string): Promise<subject[] | null> {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+"api/v1/subject/allsubjects", {
            semname: sem
        });
        return response.data.message;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        return null;
    }
}
export async function getUnit(subject: string):Promise<unit[]|null>{
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+"api/v1/unit/getall", {
            name: subject
        });

        return response.data.message;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        return null;
    }
}
export async function getMaterals(unit: string):Promise<material[]|null>{
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+"api/v1/material/getall", {
            unitname: unit
        });
        return response.data.message;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        return null;
    }
}
export type user={
    name: string,
    email:string
}
export type rawuser={
    id: string,
            name: string,
            email: string,
            password: string,
            materials: Array<string>,
            createdAt: string,
            updatedAt: string
}
export async function getAllUsers(): Promise<user[]>{
    const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/user/admin/getall');
    const rawdata:rawuser[] = response.data.message;
    const data = rawdata.map(user => {
        return {
            name: user.name,
            email: user.email
        }
    })
    return data;
}

