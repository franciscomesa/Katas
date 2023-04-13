import {Anchor} from "./Anchor";

export type MarkDownContent = string

export class MarkdownPage {
    constructor(private readonly inputContent: string) {

    }

    moveLinksToFootNotesWithAnchors(): MarkDownContent {
        const anchors = this.findAnchorsAtPage(this.inputContent)
        const createDictionaryFromAnchors = (total: Record<string, Anchor>, current: Anchor, index: number) => {
            return {...total, [`[^anchor${index + 1}]`]: current}
        };
        const anchorsDictionary = anchors.reduce(createDictionaryFromAnchors, {})

        const replacedText = this.replaceAnchors(this.inputContent, anchorsDictionary)
        return this.addFootNotes(replacedText, anchorsDictionary);
    }

    private findAnchorsAtPage(text: string): Array<Anchor> {
        const anchors: Array<Anchor> = new Array<Anchor>()

        if (this.containsAnchor(text)) {
            const openingTag = "["
            const closingTag = ")";
            const closingTagPosition = text.indexOf(closingTag);
            const openingTagPosition = text.indexOf(openingTag)

            const anchoreExpression = text.substring(openingTagPosition, closingTagPosition + closingTag.length)
            const rest = text.substring(closingTagPosition + closingTag.length)
            const anchor = Anchor.fromMarkdown(anchoreExpression)
            anchors.push(anchor)

            const results = this.findAnchorsAtPage(rest);
            results.forEach(item => {
                const alreadyInList = anchors.find((current) => current.isEqual(item));
                if (!alreadyInList) {
                    anchors.push(item)
                }
            })
        }
        return anchors
    }

    private replaceAnchors(inputContent: string, anchorsDictionary: Record<string, Anchor>): string {
        const anchorKeys = Object.keys(anchorsDictionary)

        anchorKeys.forEach((key) => {
            const anchor = anchorsDictionary[key]
            inputContent = inputContent.replace(anchor.toMarkdown(), `${anchor.text} ${key}`)
        })

        return inputContent;
    }

    private addFootNotes(text: string, anchorsDictionary: Record<string, Anchor>): string {
        const anchorToFootnote = (footnoteKey: string) => `${footnoteKey}: ${anchorsDictionary[footnoteKey].url}`;
        return [
            text,
            ...Object.keys(anchorsDictionary).map(anchorToFootnote)
        ].join("\n\n")
    }

    private containsAnchor(text: string) {
        return text.match(/.*\[.*?\]\(.*?\).*/);
    }
}