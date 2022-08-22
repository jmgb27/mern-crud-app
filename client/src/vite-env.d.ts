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

interface ImportMetaEnv {
    readonly VITE_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
