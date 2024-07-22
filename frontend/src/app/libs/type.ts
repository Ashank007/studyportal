export type sem={
    id: string;
    semname: string;
}
export type subject={
    id:string;
    name:string;
}
export type unit={
    id: string;
    title:string;
}
export type docType = 'Docs'|'Pdf'|'Ppt';
export type material={
        id:string;
        title:string;
        materialtype:docType;
        url?:string;
        Url?:string;
}
export type user={
    id:string;
    name:string;
    email:string;
}
type unitData = unit & {
    materials: Array<material>;
}
type subjectData= subject & {
    units : Array<unitData>;
}
export type alldata={
    id:string;
    semname:string;
    materials: Array<string>;
    units: Array<string>;
    subjects:Array<subjectData>;
}