const client = require('../client/index')

const listController = {
    dataList: async (req, res) => {
        try {
            const fileName = req.query.filaName
            const response = await client.get('/secret/files')
            let getData = response.data.files
            if (!getData.length) {
                return res.json({ "s": false, "m": "there are no files to search", "d": "" })
            }

            if (fileName !== undefined) {
                getData = getData.filter(((element) => element === fileName))
                if (!getData.length) {
                    return res.json({ "s": false, "m": `fileName ${fileName} doesn't exist`, "d": "" })
                }
            }

            const fileList = await Promise.all(
                getData.map(async (element) => {
                    try {
                        const fileNameResponse = await client.get(`/secret/file/${element}`)
                        const processedData = fileNameResponse.data

                        const lines = processedData.split('\n')
                            .filter((item) => {
                                const lineData = item.split(',')
                                return (lineData.length < 4 || lineData[0] === 'file') ? false : true
                            })
                            .map((newItem) => {
                                const lineData = newItem.split(',')
                                return { text: lineData[1], number: lineData[2], hex: lineData[3] }
                            })
                        return { file: element, lines: lines }
                    } catch (error) {
                        console.log({ ...error.response.data, fileName: element })
                        return ''
                    }
                })
            )

            const filterFileList = [...fileList.filter((item) => (item === '' || item.lines?.length === 0 || item.lines?.length === undefined) ? false : true)]

            if (!filterFileList.length) {
                return res.json({ "s": false, "m": `fileName ${fileName} has no lines`, "d": "" })
            }

            return res.json(filterFileList)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    getList: async (req, res) => {
        try {
            const response = await client.get('/secret/files')
            const getData = response.data.files
            if (!getData.length) {
                return res.json({ "s": false, "m": "there are no files to search", "d": "" })
            }
            return res.json(response.data)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    }
}

module.exports = listController