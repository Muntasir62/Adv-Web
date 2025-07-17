import { Injectable } from "@nestjs/common";

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
}