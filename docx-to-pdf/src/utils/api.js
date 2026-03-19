import axios from "axios"

const url = 'http://localhost:3000'

const convertor = async (file) => {
    try {
        const formdata = new FormData()
        formdata.append('file', file)
        const res = await axios.post(url + '/converter', formdata)
        const fileRes = await axios.get(res.data, { responseType: 'blob' })
        const downloadUrl = window.URL.createObjectURL(new Blob([fileRes.data]))
        const link = document.createElement('a')
        link.href = downloadUrl
        const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name
        link.download = `${originalName}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
        console.log(err);
    }
}

export default convertor