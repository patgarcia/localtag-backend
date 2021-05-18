const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:4000')

const newCollection = {
    name: "New"
}

var newID = ''

describe("GET /collections", () => {
    it("Returns a 200 response", done => {
        api
            .get("/collections")
            .set("Accept", "application/json")
            .expect(200, done)
    })
    it("Returns an array of objects", done => {
        api
            .get("/collections")
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.body).to.be.an('array')
                res.body.forEach(doc => {
                    expect(doc).to.be.an('object')
                })
                done()
            })
    })
    it("Objects have 'name' 'cover_card' 'owner' 'location' and 'tag'", done => {

        api
            .get("/collections")
            .set("Accept", "application/json")
            .end((err, res) => {
                res.body.forEach(doc => {
                    expect(doc).to.have.property('name')
                    expect(doc).to.have.property('cover_card')
                    expect(doc).to.have.property('owner')
                    expect(doc).to.have.property('location')
                    expect(doc).to.have.property('tag')
                })
                done()
            })
        })
})

describe("POST /collections", () => {
    before(done => {
        api
            .post('/collections')
            .set('Accept', 'application/json')
            .send(newCollection)
            .end((req, res) => {
                newID = res.body["_id"]
                done()
            })
    })
    it("Returns the newly added object", done => {
         api
            .get('/collections')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.body.find(collection => collection.location === newLocation.location)).to.be.an('object')
            })
            done()
    })
    it("New object has 'name' 'cover_card' 'owner' 'location' and 'tag'", done => {
        api
            .get('/collections')
            .set('Accept', 'application/json')
            .end((err, res) => {
                newObj = res.body.find(collection => collection["_id"] === newID)
                expect(newObj).to.have.property('name')
                expect(newObj).to.have.property('cover_card')
                expect(newObj).to.have.property('owner')
                expect(newObj).to.have.property('location')
                expect(newObj).to.have.property('tag')
            })
            done()
    })
})

describe("PATCH /collections/:id", () => {
    it("Returns an object", done => {
        api
            .patch(`/collections/${newID}`)
            .set('Accept', 'application/json')
            .send({"name" : "X"})
            .end((err, res) => {
                expect(res).to.be.an('object')
            })
            done()
    })
    it("Object is updated", done => {
        api
            .get(`/collections/${newID}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.name === "X")
            })
            done()
    })
})

describe("DELETE /collections/:id", () => {
    it("Returns an object", done => {
        api
            .delete(`/collections/${newID}`)
            .set('Accept', 'application/json')
            .end(done)
    })
    it("Object is deleted", done => {
        api
        .get('/collections')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.body.find(collection => collection["_id"] === newID)).to.be.undefined
        })
        done()

    })
})
