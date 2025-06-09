"use client";
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    const btnClass = (isActive) =>
        `px-2 py-1 border rounded text-sm transition cursor-pointer duration-300 ease-in-out ${
            isActive
                ? "bg-primary text-white border-primary"
                : "hover:bg-gray-100 border-gray-300"
        }`;

    return (
        <div className="flex flex-wrap gap-2 border-b border-b-gray-400 px-3 py-2 bg-gray-50 rounded-t-xl">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={btnClass(editor.isActive("bold"))}
            >
                <b>B</b>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={btnClass(editor.isActive("italic"))}
            >
                <i>I</i>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
                className={btnClass(editor.isActive("underline"))}
            >
                <u>U</u>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={
                    !editor.can().chain().focus().toggleBulletList().run()
                }
                className={btnClass(editor.isActive("bulletList"))}
            >
                • List
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={
                    !editor.can().chain().focus().toggleOrderedList().run()
                }
                className={btnClass(editor.isActive("orderedList"))}
            >
                1. List
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={btnClass(editor.isActive("paragraph"))}
            >
                ¶
            </button>
        </div>
    );
};

export default function JobDescriptionEditor({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Underline,
            Link,
            Highlight,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc pl-5",
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal pl-5",
                },
            }),
            ListItem,
        ],
        content: value || "<p></p>",
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
        },
        editorProps: {
            attributes: {
                class: "prose max-w-none h-full min-h-[200px] p-4 focus:outline-none",
            },
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "<p></p>");
        }
    }, [value, editor]);

    return (
        <div className="border rounded-xl border-gray-400 w-full flex flex-col h-full min-h-[200px]">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="flex-1 overflow-auto" />
        </div>
    );
}
