import fs, { PathOrFileDescriptor } from 'fs'
import path from 'path'

export async function displayBanner(filename: PathOrFileDescriptor) {

    try {
        const data = fs.readFileSync(filename, { encoding: 'utf-8' })
        console.log(data)
    }

    catch(err) {
        console.error("Execution error: \n", err)
    }

}