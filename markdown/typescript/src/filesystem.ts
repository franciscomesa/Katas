import * as fs from "fs";

export class FileSystem {
    exists(filePath: string) {
        return fs.existsSync(filePath)
    }

    readContent(filePath: string): string {
        return fs.readFileSync(filePath).toString()
    }

    write(filePath: string, transformedMarkDown: string): void {
        fs.writeFileSync(filePath, transformedMarkDown)
    }
}