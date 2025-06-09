"use client";
import { useEffect, useState } from "react";
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

export default function JobDescriptionEditor({
    value,
    onChange,
    required = true,
}) {
    const [isTouched, setIsTouched] = useState(false);
    const [error, setError] = useState(null);

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

            if (required) {
                validateContent(editor.getText());
            }
        },
        editorProps: {
            attributes: {
                class: `prose max-w-none h-full min-h-[200px] p-4 focus:outline-none ${
                    error ? "border border-red-500" : "border border-gray-300"
                }`,
            },
        },
    });

    const validateContent = (text) => {
        if (required && !text.trim()) {
            setError("Field ini wajib diisi");
            return false;
        }
        setError(null);
        return true;
    };

    const handleBlur = () => {
        setIsTouched(true);
        if (editor && required) {
            validateContent(editor.getText());
        }
    };

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "<p></p>");
        }
    }, [value, editor]);

    return (
        <div className="w-full flex flex-col">
            <div
                className={`border rounded-xl flex flex-col h-full min-h-[200px] ${
                    error && isTouched ? "border-red-500" : "border-gray-300"
                }`}
            >
                <MenuBar editor={editor} />
                <EditorContent
                    editor={editor}
                    className="flex-1 overflow-auto"
                    onBlur={handleBlur}
                />
            </div>

            {error && isTouched && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
