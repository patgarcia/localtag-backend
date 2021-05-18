const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:4000')

const testTag = {
    name: "HashTag"
}

var newID = ''

describe("GET /tags", () => {
    it("Returns a 200 response", done => {
        api
            .get("/tags")
            .set("Accept", "application/json")
            .expect(200, done)
    })
    it("Returns an array of objects", done => {
        api
            .get("/tags")
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.body).to.be.an('array')
                res.body.forEach(doc => {
                    expect(doc).to.be.an('object')
                })
                done()
            })
    })
    it("Objects have a 'name' " , done => {

        api
            .get("/tags")
            .set("Accept", "application/json")
            .end((err, res) => {
                res.body.forEach(doc => {
                    expect(doc).to.have.property('name')
                })
                done()
            })
        })
})

describe("POST /tags", () => {
    before(done => {
        api
            .post('/tags')
            .set('Accept', 'application/json')
            .send(testTag)
            .end((req, res) => {
                newID = res.body["_id"]
                done()
            })
    })
    it("Returns the newly added object", done => {
         api
            .get('/tags')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.body.find(doc => doc.name === testTag.name)).to.be.an('object')
            })
            done()
    })
    it("New object has 'name' ", done => {
        api
            .get('/tags')
            .set('Accept', 'application/json')
            .end((err, res) => {
                newObj = res.body.find(location => location["_id"] === newID)
                expect(newObj).to.have.property('name')
            })
            done()
    })
})

describe("PATCH /tags/:id", () => {
    it("Returns an object", done => {
        api
            .patch(`/tags/${newID}`)
            .set('Accept', 'application/json')
            .send({"name" : "Ron"})
            .end((err, res) => {
                expect(res).to.be.an('object')
            })
            done()
    })
    it("Object is updated", done => {
        api
            .get(`/tags/${newID}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.name === "Ron")
            })
            done()
    })
})

describe("DELETE /tags/:id", () => {
    it("Returns an object", done => {
        api
            .delete(`/tags/${newID}`)
            .set('Accept', 'application/json')
            .end(done)
    })
    it("Object is deleted", done => {
        api
        .get('/tags')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.body.find(name => name["_id"] === newID)).to.be.undefined
        })
        done()

    })
})
