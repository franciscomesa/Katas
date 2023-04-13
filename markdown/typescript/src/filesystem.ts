import * as fs from "fs";

export class FileSystem {
    exists(file: string) {
        return fs.existsSync(file)
    }

    readContent(inputFile: string): string {
        return fs.readFileSync(inputFile).toString()
    }

    write(outputFile: string, transformedMarkDown: string): void {
        fs.writeFileSync(outputFile, transformedMarkDown)
    }
}