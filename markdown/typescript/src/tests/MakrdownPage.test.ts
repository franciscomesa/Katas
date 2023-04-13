import {MarkdownPage} from "../MarkdownPage";
import {Anchor} from "../Anchor";

describe ('replace anchors by foot notes', () => {
    it.each([
        {title: 'Empty string', testCases: ['', '']},
        {title: 'Withoutanchor', testCases: ['text', 'text']},
        {title: 'Just a link', testCases: ['[visible text link](url)', 'visible text link [^anchor1]\n\n[^anchor1]: url']},
        {title: 'Text and link', testCases: ['irrelevant [visible text link](url)', 'irrelevant visible text link [^anchor1]\n\n[^anchor1]: url']},
        {title: 'Link and text', testCases: ['[visible text link](url) irrelevant', 'visible text link [^anchor1] irrelevant\n\n[^anchor1]: url']},
        {title: 'Text link and text', testCases: ['irrelevant [visible text link](url) irrelevant', 'irrelevant visible text link [^anchor1] irrelevant\n\n[^anchor1]: url']},
        {title: 'Two links together', testCases: ['[visible text link](url)[another visible text](url)', 'visible text link [^anchor1]another visible text [^anchor2]\n\n[^anchor1]: url\n\n[^anchor2]: url']},
        {title: 'Link Text and Link', testCases: ['[visible text link](url), [another visible text](url)', 'visible text link [^anchor1], another visible text [^anchor2]\n\n[^anchor1]: url\n\n[^anchor2]: url']},
    ])(`$title`,
        ({testCases}) => {
            const markdownWithFootNotes = new MarkdownPage(testCases[0]).moveLinksToFootNotesWithAnchors()

            expect(markdownWithFootNotes).toBe(testCases[1])
        }
    )
})