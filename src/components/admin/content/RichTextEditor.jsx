"use client";

import { useRef, useEffect } from "react";

export default function RichTextEditor({ value = "", onChange, placeholder = "Write content..." }) {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || "";
        }
    }, [value]);

    const exec = (cmd, arg = null) => {
        if (typeof document === "undefined") return;
        editorRef.current?.focus();
        document.execCommand(cmd, false, arg);
        onChange?.(editorRef.current?.innerHTML || "");
    };

    const insertLink = () => {
        const url = window.prompt("Enter link URL (e.g. https://... or /buy):");
        if (url) exec("createLink", url);
    };

    return (
        <div className="admin-rte">
            <div className="admin-rte__toolbar" role="toolbar" aria-label="Text formatting">
                <button type="button" className="admin-rte__btn" onClick={() => exec("bold")}>
                    B
                </button>
                <button type="button" className="admin-rte__btn" onClick={() => exec("italic")}>
                    <em>I</em>
                </button>
                <button
                    type="button"
                    className="admin-rte__btn"
                    onClick={() => exec("formatBlock", "H2")}
                >
                    H2
                </button>
                <button
                    type="button"
                    className="admin-rte__btn"
                    onClick={() => exec("formatBlock", "H3")}
                >
                    H3
                </button>
                <button
                    type="button"
                    className="admin-rte__btn"
                    onClick={() => exec("insertUnorderedList")}
                >
                    • List
                </button>
                <button
                    type="button"
                    className="admin-rte__btn"
                    onClick={() => exec("insertOrderedList")}
                >
                    1. List
                </button>
                <button type="button" className="admin-rte__btn" onClick={insertLink}>
                    Link
                </button>
                <button
                    type="button"
                    className="admin-rte__btn"
                    onClick={() => exec("removeFormat")}
                >
                    Clear
                </button>
            </div>

            <div
                ref={editorRef}
                className="admin-rte__editor"
                contentEditable
                suppressContentEditableWarning
                data-placeholder={placeholder}
                onInput={() => onChange?.(editorRef.current?.innerHTML || "")}
            />
        </div>
    );
}

