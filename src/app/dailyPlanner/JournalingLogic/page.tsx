'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { JournalContextType, entryType } from '../JournalingType/page';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor } from '@tiptap/react';
const JournalContext = createContext<JournalContextType | undefined>(undefined);
export default function JournalProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [entries, setEntries] = useState<entryType[]>([]);
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('journal-entries');
        if (saved) {
            try {
                setEntries(JSON.parse(saved));
            } catch (e) {
                console.error("Error loading entries", e);
            }
        }
    }, []);

    const syncLocalStorage = (data: entryType[]) => {
        localStorage.setItem('journal-entries', JSON.stringify(data));
    };

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: { levels: [2] } }),
            Image.configure({ inline: true, allowBase64: true }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') return 'Write the title';
                    return 'Write something...';
                },
            }),
        ],
        content: `<h2></h2><p></p>`,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-slate dark:prose-invert lg:prose-lg max-w-none focus:outline-none min-h-[500px] p-12 text-slate-700 dark:text-white',
            },
        },
    });

    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result as string;
                    if (result && editor) {
                        editor.chain().focus().setImage({ src: result }).run();
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const handleSave = () => {
        const currentContent = editor?.getHTML();
        if (currentContent && currentContent !== '<h2></h2><p></p>') {
            const newEntry: entryType = {
                id: Date.now(),
                content: currentContent,
            };       
            const updatedEntries = [...entries,newEntry];
            setEntries(updatedEntries);
            syncLocalStorage(updatedEntries);
            editor?.commands.setContent('<h2></h2><p></p>');
        }
    };

    const deleteEntry = (id: number) => {
        if (window.confirm("Are you sure you want to delete this memory?")) {
            const updatedEntries = entries.filter(entry => entry.id !== id);
            setEntries(updatedEntries);
            syncLocalStorage(updatedEntries);
        }
    };

    const loadEntry = (id: number) => {
        const entryToEdit = entries.find(e => e.id === id);
        if (entryToEdit && editor) {
            editor.commands.setContent(entryToEdit.content);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const formatDate = (timestamp: number): string => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const value = {
        editor,
        addImage,
        mounted,
        handleSave,
        entries,
        deleteEntry,
        loadEntry,
        formatDate
    };

    return (
        <JournalContext.Provider value={value}>
            {children}
        </JournalContext.Provider>
    );
};
export const useJournal = () => {
    const context = useContext(JournalContext);
    if (context === undefined) {
        throw new Error('useJournal must be used within a JournalProvider');
    }
    return context;
};