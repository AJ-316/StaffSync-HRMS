import { JSX, useEffect, useRef, useState } from 'react';
import 'highlight.js/styles/github-dark-dimmed.css'
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import React from 'react';
import { BriefcaseIcon, ShieldCheckIcon, StarIcon } from '@heroicons/react/24/solid';
import { Bars2Icon, BoldIcon, H1Icon, ItalicIcon, StrikethroughIcon } from '@heroicons/react/24/outline';
import { BlockquoteIcon } from '@sidekickicons/react/24/outline';

interface MarkdownTextArea {
    title: string;
    body: string;
    active: boolean;
}

interface MultiMarkdownCardProps {
    titles: string[];
    selectedCard: string;
    onInputChange: (key: string, value: string) => void;
}

type MarkdownInsertType = "surround" | "prefix" | "line";

const MultiMarkdownCard = ({ onInputChange, titles, selectedCard }: MultiMarkdownCardProps) => {

    const [textAreas, setTextAreas] = useState<MarkdownTextArea[]>([]);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setTextAreas(prev => {
            return titles.map(title => {
                const existing = prev.find(t => t.title === title);
                return {
                    title,
                    body: existing?.body ?? "",
                    active: selectedCard === title,
                };
            });
        });
    }, [titles])

    useEffect(() => {

        setTextAreas(prev => prev.map((textArea) => {
            return { ...textArea, active: selectedCard === textArea.title };
        }));
    }, [selectedCard])

    const handleInput = (title: string, value: string) => {
        onInputChange(title, value);

        setTextAreas(prev => prev.map((textArea) => {
            if (textArea.title === title) {
                return { ...textArea, body: value };
            }
            return { ...textArea };
        }))
    }

    const iconMap: Record<string, JSX.Element> = {
        briefcase: <BriefcaseIcon className="w-[1.5rem] h-[1.5rem] m-1 text-accent/90" />,
        star: <StarIcon className="w-[1.5rem] h-[1.5rem] m-1 text-accent/90" />,
        check: <ShieldCheckIcon className="w-[1.5rem] h-[1.5rem] m-1 text-accent/90" />,
    };

    const parseHighlight = (text: string): React.ReactNode[] => {
        const parts = text.split(/(==.*?==)/g);
        return parts.map((part, index) => {
            if (part.startsWith('==') && part.endsWith('==')) {
                const inner = part.slice(2, -2); // remove ==
                const [iconKey, label] = inner.split(':');

                const IconElement = iconMap[iconKey.trim().toLowerCase()];

                return (
                    <span className="flex flex-row items-center" key={index}>
                        {IconElement}
                        <span className="title-p-small font-bold m-1 text-accent/90">
                            {label || iconKey}
                        </span>
                    </span>
                );
            }

            return <React.Fragment key={index}>{part}</React.Fragment>;
        });
    };

    const getMarkdownBtn = (icon: JSX.Element, tooltip: string, onClick: () => void) => {
        const styledIcon = React.cloneElement(icon, {
            className: 'w-4 h-4',
        });
        return <button
            title={tooltip}
            type="button"
            className="btn w-[14.4%] btn-soft btn-accent m-1 pointer-events-auto" /* w-[2rem] h-[2rem] */
            onClick={(e) => { e.preventDefault(); onClick(); }}
        >
            {styledIcon}
        </button>
    }

    const insertMarkdownElement = (element: string, type: MarkdownInsertType) => {
        if (!textAreaRef.current) return;

        const textArea = textAreaRef.current;
        const textAreaData = getActiveTextArea();
        if (!textAreaData) return;

        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const original = textArea.value;
        const selectedText = original.slice(start, end);

        let updatedText = "";
        let newCursorPos = start;

        switch (type) {
            case "surround":
                updatedText =
                    original.slice(0, start) +
                    element +
                    selectedText +
                    element +
                    original.slice(end);
                newCursorPos = start + (selectedText ? element.length * 2 + selectedText.length : element.length);
                break;

            case "prefix":
                // Get line start
                {
                    const lineStart = original.lastIndexOf("\n", start - 1) + 1;
                    updatedText =
                        original.slice(0, lineStart) +
                        element +
                        original.slice(lineStart);
                    newCursorPos = start + element.length;
                    break;
                }

            case "line":
                // Insert full line above or below
                {
                    const insertAt = original.lastIndexOf("\n", start - 1) + 1;
                    updatedText =
                        original.slice(0, insertAt) +
                        element +
                        "\n" +
                        original.slice(insertAt);
                    newCursorPos = start + element.length + 1;
                    break;
                }

            default:
                return;
        }

        onInputChange(textAreaData.title, updatedText);

        setTextAreas(prev =>
            prev.map(tA => {
                if (tA.title === textAreaData.title) {
                    return { ...tA, body: updatedText };
                }
                return { ...tA };
            })
        );

        setTimeout(() => {
            textArea.focus();
            textArea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const getActiveTextArea = () => {
        const textArea = textAreas.find((textArea) => { return textArea.active });

        if (textArea === undefined) {
            return {
                title: "",
                body: "",
                active: false
            }
        }

        return textArea;
    }

    return (
        <div className="flex flex-row w-full gap-4 p-4">
            {textAreas.map((textArea, key) =>
                textArea.active &&
                <div key={key} className="group relative w-full h-[17rem] mt-[3rem]">
                    <textarea
                        ref={textAreaRef}
                        value={textArea.body}
                        onChange={(e) => handleInput(textArea.title, e.target.value)}
                        className="card text-sm bg-base-100 rounded-t-none w-full h-full p-4 rounded resize-none
                        border-1 border-transparent group-focus-within:border-accent-content group-focus-within:border-t-transparent
                        group-hover:border-accent-content group-hover:border-t-transparent"
                        placeholder="Write in Markdown..."
                    />
                    <div className='absolute flex flex-row justify-between w-full bottom-[100%] bg-base-100 rounded-t-sm pointer-events-none
                        border-1 border-transparent group-focus-within:border-accent-content group-focus-within:border-b-transparent 
                        group-hover:border-accent-content group-hover:border-b-transparent'>
                        {getMarkdownBtn(<BoldIcon />, "Bold", () => insertMarkdownElement("**", "surround"))}
                        {getMarkdownBtn(<ItalicIcon />, "Emphasis", () => insertMarkdownElement("*", "surround"))}
                        {getMarkdownBtn(<StrikethroughIcon />, "Strike", () => insertMarkdownElement("~~", "surround"))}
                        {getMarkdownBtn(<H1Icon />, "Title", () => insertMarkdownElement("### ", "prefix"))}
                        {getMarkdownBtn(<Bars2Icon />, "Separator", () => insertMarkdownElement("\n---", "line"))}
                        {getMarkdownBtn(<BlockquoteIcon />, "Block Quote", () => insertMarkdownElement("> ", "prefix"))}

                    </div>
                </div>
            )}
            <div className="divider divider-horizontal">=</div>
            {textAreas.map((textArea, key) =>
                textArea.active &&
                <div key={key} className="card text-sm bg-base-100 prose w-full h-[20rem] p-4 overflow-y-auto">
                    <Markdown
                        components={{
                            p({ children }) {
                                const childrenArray = React.Children.toArray(children);

                                return (
                                    <p>
                                        {childrenArray.map((child, i) => {
                                            if (typeof child === 'string') {
                                                return <React.Fragment key={i}>{parseHighlight(child)}</React.Fragment>;
                                            }
                                            return <React.Fragment key={i}>{child}</React.Fragment>;
                                        })}
                                    </p>
                                );
                            },
                        }}
                        rehypePlugins={[rehypeHighlight]}
                        remarkPlugins={[remarkGfm]}
                    >{`==${textArea.title}==  \n\n${textArea.body.length === 0 ? "*Empty*\n\n---" : textArea.body}`}</Markdown>
                </div>
            )}
        </div>
    );
};

export default MultiMarkdownCard
