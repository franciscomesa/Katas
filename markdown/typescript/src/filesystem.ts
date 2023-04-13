import * as fs from "fs";
import {MarkDownContent} from "./MarkdownPage";

export class FileSystem {
    exists(filePath: string) {
        return fs.existsSync(filePath)
    }

    readContent(filePath: string): string {
        return fs.readFileSync(filePath).toString()
    }

    write(filePath: string, content: MarkDownContent): void {
        fs.writeFileSync(filePath, content)
    }
}