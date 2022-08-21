/// <reference types="vite/client" />

export interface Form {
    name?: string;
    position?: string;
    level?: string;
    records?: [];
}

export interface Props {
    deleteRecord(_id: string): unknown;
    id?: string;
    record: {
        _id: string;
        name: string;
        position: string;
        level: string;
    };
}
