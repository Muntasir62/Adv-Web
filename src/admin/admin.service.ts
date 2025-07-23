import { Injectable } from "@nestjs/common";
import { createadmindto } from "./admin.dto";

@Injectable()
export class adminservice {
    signin(): string
    {
        return 'Sign in';
    }
    signup(): string
    {
        return 'Sign up';
    }
    getid(name : string) : string
    {
        return `The given name is ${name} `;
    }
    createadmin(createadmindto: createadmindto): string
    {
        console.log('Name :', createadmindto.name);
        const {name, email} = createadmindto;
        return `New admin created : ${name} and  ${email}`;
    }
    getadmin(adminid: number) : string
    {
       return 'Admin id is' +adminid;
    }
    addadmin(data: createadmindto): string
    {
        const {name, email, password} = data
        console.log('Name :', name );
        console.log('Email :', email);
        //console.log('Password :', password);
        return `Admin ${name} added with ${email}`;
    }
}