

export interface Serializer {
    fromJson(json: any): Base;
    toJson(base: Base): any;    
}

export interface Base {
    id: string
}