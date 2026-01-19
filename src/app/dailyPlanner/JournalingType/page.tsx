import { Editor } from '@tiptap/react';

export type entryType = {
    id: number;
    content: string;
};

export type JournalContextType = {
    editor: Editor | null;
    addImage: () => void;
    mounted: boolean;
    handleSave: () => void;
    entries: entryType[];
    deleteEntry: (id: number) => void;
    loadEntry: (id: number) => void;
    formatDate: (id: number) => string;
}

export default function JournalingTypePage() {
    return null;
}