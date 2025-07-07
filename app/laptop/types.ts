export const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    enter: {
        pressed: false,
    }
}

export interface redirectionsMapProps {
    id: number;
    title: string;
    description: string;
    link: string;
    data: number[][];
}