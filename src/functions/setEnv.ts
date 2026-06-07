import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

export async function setEnv(key: string, value: string) {

    try {
        const envFilePath = path.join(__dirname, '..', '..', '.env')
        let fileContent: string
        const newLine = `${key} = "${value}"`
        const regex = new RegExp(`^${key} =.*$`, 'm')

        fileContent = fs.readFileSync(envFilePath, 'utf-8')

        if(regex.test(fileContent)) {
            fileContent = fileContent.replace(regex, newLine)
        }

        else {

            if(fileContent.length > 0 && !fileContent.endsWith('\n')) {
                fileContent += '\n'
            }

            fileContent += `${newLine}`

        }

        fs.writeFileSync(envFilePath, fileContent, 'utf-8')
        console.log("Env updated")
        config({ path: envFilePath })

    }

    catch(err) {
        console.error("Execution error: \n", err)
    }

}