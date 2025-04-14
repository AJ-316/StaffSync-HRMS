import { useEffect, useState } from 'react';
import 'highlight.js/styles/github-dark-dimmed.css'
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

interface MarkdownTextArea {
    title: string;
    body: string;
    active: boolean;
}

interface MultiMarkdownCardProps {
    titles: string[];
    selectedCard: string;
}

const MultiMarkdownCard = ({ titles, selectedCard }: MultiMarkdownCardProps) => {

    const [textAreas, setTextAreas] = useState<MarkdownTextArea[]>([]);

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

    const handleInput = (title: string | undefined, value: string) => {
        setTextAreas(prev => prev.map((textArea) => {
            if (textArea.title === title) {
                return { ...textArea, body: value };
            }
            return { ...textArea };
        }))
    }

    return (
        <div className="flex flex-row w-full gap-4 p-4">
            {textAreas.map((textArea, key) =>
                textArea.active &&
                <textarea
                    key={key}
                    value={textArea.body}
                    onChange={(e) => handleInput(textArea.title, e.target.value)}
                    className="card bg-base-100 border-1 border-transparent focus:border-accent-content w-full h-[20rem] p-4 rounded resize-none"
                    placeholder="Write in Markdown..."
                />
            )}
            <div className="divider divider-horizontal">=</div>
            {textAreas.map((textArea, key) =>
                textArea.active &&
                <div key={key} className="card bg-base-100 prose w-full h-[20rem] p-4 overflow-y-auto">
                    <Markdown
                        rehypePlugins={[rehypeHighlight]}
                        remarkPlugins={[remarkGfm]}
                    >{`**${textArea.title}**  \n${textArea.body}`}</Markdown>
                </div>
            )}
        </div>
    );
};

export default MultiMarkdownCard
