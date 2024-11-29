"use client";

import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { BlockquoteToolbar } from "@/components/toolbars/blockquote";
import { BoldToolbar } from "@/components/toolbars/bold";
import { BulletListToolbar } from "@/components/toolbars/bullet-list";
import { HardBreakToolbar } from "@/components/toolbars/hard-break";
import { HorizontalRuleToolbar } from "@/components/toolbars/horizontal-rule";
import { ItalicToolbar } from "@/components/toolbars/italic";
import { OrderedListToolbar } from "@/components/toolbars/ordered-list";
import { RedoToolbar } from "@/components/toolbars/redo";
import { StrikeThroughToolbar } from "@/components/toolbars/strikethrough";
import { ToolbarProvider } from "@/components/toolbars/toolbar-provider";
import { UndoToolbar } from "@/components/toolbars/undo";

interface ContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    code: {
      HTMLAttributes: {
        class: "bg-accent rounded-md p-1",
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: "my-2",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "bg-primary text-primary-foreground p-2 text-sm rounded-md",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
      HTMLAttributes: {
        class: "tiptap-heading",
      },
    },
  }),
];

export function ContentEditor({ value, onChange }: ContentEditorProps) {
  const editor = useEditor({
    extensions: extensions as Extension[],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg prose-stone dark:prose-invert focus:outline-none max-w-none mdxeditor",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden rounded-md border pb-3">
      <div className="sticky left-0 top-0 z-20 flex w-full items-center justify-between border-b bg-background px-2 py-2">
        <ToolbarProvider editor={editor}>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <UndoToolbar type="button" />
              <RedoToolbar type="button" />
              <Separator orientation="vertical" className="h-7" />
            </div>

            <div className="flex items-center gap-2">
              <BoldToolbar type="button" />
              <ItalicToolbar type="button" />
              <StrikeThroughToolbar type="button" />
              <Separator orientation="vertical" className="h-7" />
            </div>

            <div className="flex items-center gap-2">
              <BulletListToolbar type="button" />
              <OrderedListToolbar type="button" />
              <Separator orientation="vertical" className="h-7" />
            </div>

            <div className="flex items-center gap-2">
              <BlockquoteToolbar type="button" />
              <Separator orientation="vertical" className="h-7" />

              <HorizontalRuleToolbar type="button" />
              <HardBreakToolbar type="button" />
            </div>
          </div>
        </ToolbarProvider>
      </div>

      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className="relative min-h-[18rem] bg-background"
      >
        <div className="p-4">
          <EditorContent className="outline-none" editor={editor} />
        </div>
      </div>
    </div>
  );
}
