import { Models } from "node-appwrite";

export enum MemberRole {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER"
};

export type Member = Models.Document & {
    workspaceid: string;
    userId: string;
    role: MemberRole;
};