const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/app');
chai.use(chaiHttp);

const listFromApi = {
    files: [
        'test1.csv',
        'test2.csv',
        'test3.csv',
        'test4.csv',
        'test5.csv',
        'test6.csv',
        'test9.csv'
    ]
}

const fileNameDoesntExist = {
    "s": false,
    "m": "fileName randomFileName doesn't exist",
    "d": ""
}

const fileEmptyLines = {
    "s": false,
    "m": `fileName test4.csv has no lines`,
    "d": ""
}


describe('check list routes', () => {
    it('fileList listed successfully', () => {
        chai.request(app)
            .get('/files/data')
            .end((err, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.lengthOf.greaterThan(0)
            })
    })

    it('chack fileList with params listed successfully', () => {
        chai.request(app)
            .get('/files/data?filaName=test2.csv')
            .end((err, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.lengthOf.greaterThan(0)
            })
    })

    it('check fileList with random fileName', () => {
        chai.request(app)
            .get('/files/data?fileName=randomFileName')
            .end((err, res) => {
                expect(res.status).to.be.equal(404)
                expect(res.body).to.eql(fileNameDoesntExist)

            })
    })

    it('check fileList with a file with empty lines', () => {
        chai.request(app)
            .get('/files/data?fileName=test4.csv')
            .end((err, res) => {
                expect(res.status).to.be.equal(404)
                expect(res.body).to.eql(fileEmptyLines)

            })
    })

    it('list data from API', () => {
        chai.request(app)
            .get('/files/list')
            .end((err, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.eql(listFromApi)
            })
    })
})