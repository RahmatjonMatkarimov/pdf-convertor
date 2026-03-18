import axios from "axios"

const url = 'http://localhost:3000'

const convertor = async (file) => {
    try {
        const formdata = new FormData()
        formdata.append('file', file)
        const res = await axios.post(url + '/converter', formdata)
        window.open(res.data)
    } catch (err) {
        console.log(err);
    }
}

export default convertor    