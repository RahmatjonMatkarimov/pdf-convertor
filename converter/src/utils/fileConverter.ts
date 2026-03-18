import { readFileSync, unlink, writeFileSync } from 'fs';
import converter from 'libreoffice-convert'
import { basename, extname, join } from 'path';
import { cwd } from 'process';

const convert = async (filename: string) => {
    const filepath = join(cwd(), 'uploads', filename)
    const outdir = join(cwd(), 'uploads', basename(filename, extname(filename)) + '.pdf')
    const file = readFileSync(filepath)
    await converter.convert(file, '.pdf', undefined, (err, data) => {
        if (err) {
            console.error(err);
            return
        }
        writeFileSync(outdir, data)
        unlink(filepath, (err) => {
            if (err) {
                console.log(err);
            }
        })
    })
    const pdfUrl = 'http://localhost:3000/uploads/' + basename(filename, extname(filename)) + '.pdf';
    return pdfUrl
}

export default convert