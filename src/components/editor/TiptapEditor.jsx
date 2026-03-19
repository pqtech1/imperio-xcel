import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Heading2,
  List,
  Link2,
  Image as ImageIcon,
} from "lucide-react";

export default function TiptapEditor({ content, setContent }) {
  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  const ToolbarButton = ({ onClick, active, icon: Icon, tooltip }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 transition-colors ${
        active ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
      title={tooltip}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="border border-gray-300">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 border-b border-gray-300 p-1 bg-gray-50 flex-wrap">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          icon={Bold}
          tooltip="Bold"
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          icon={Italic}
          tooltip="Italic"
        />

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          icon={Heading2}
          tooltip="Heading 2"
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          icon={List}
          tooltip="Bullet List"
        />

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => {
            const url = window.prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          active={editor.isActive("link")}
          icon={Link2}
          tooltip="Add Link"
        />

        <ToolbarButton
          onClick={() => {
            const url = window.prompt("Enter image URL:");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          icon={ImageIcon}
          tooltip="Add Image"
        />
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[250px] prose prose-sm max-w-none text-gray-900"
      />

      {/* Character/Word Count (optional - adds minimal touch) */}
      <div className="border-t border-gray-300 px-4 py-2 bg-gray-50 text-xs text-gray-500 flex justify-end">
        <span>{editor.storage.characterCount?.words() || 0} words</span>
      </div>
    </div>
  );
}
