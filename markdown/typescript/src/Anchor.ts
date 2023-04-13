import {MarkDownContent} from "./MarkdownPage";

export class Anchor {
    constructor(public readonly url: string, public readonly text: string) {

    }

    static fromMarkdown(content: MarkDownContent): Anchor {
        const separator = "](";
        const start = "[".length;
        const visibleText = content.substring(start, content.indexOf(separator))
        const closingTag = ")";
        const end = content.indexOf(closingTag, start);
        const url = content.substring(content.indexOf(separator) + separator.length, end)

        return new Anchor(url, visibleText)
    }

    isEqual(item: Anchor) {
        return this.url === item.url && this.text === item.text;
    }

    toMarkdown(): string {
        return `[${this.text}](${this.url})`;
    }
}