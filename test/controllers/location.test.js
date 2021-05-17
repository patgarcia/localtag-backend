const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:4000')

const newLocation = {
    lat: 26.6406,
    long: 81.8723,
    city: "Fort Myers", 
    state: "Florida", 
    country: "USA"
}

var newID = ''

describe("GET /locations", () => {
    it("Returns a 200 response", done => {
        api
            .get("/locations")
            .set("Accept", "application/json")
            .expect(200, done)
    })
    it("Returns an array of objects", done => {
        api
            .get("/locations")
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.body).to.be.an('array')
                res.body.forEach(doc => {
                    expect(doc).to.be.an('object')
                })
                done()
            })
    })
    it("Objects have 'lat' 'long' 'city' 'state' and 'country'", done => {

        api
            .get("/locations")
            .set("Accept", "application/json")
            .end((err, res) => {
                res.body.forEach(doc => {
                    expect(doc).to.have.property('lat')
                    expect(doc).to.have.property('long')
                    expect(doc).to.have.property('city')
                    expect(doc).to.have.property('state')
                    expect(doc).to.have.property('country')
                })
                done()
            })
        })
})

describe("POST /locations", () => {
    before(done => {
        api
            .post('/locations')
            .set('Accept', 'application/json')
            .send(newLocation)
            .end((req, res) => {
                newID = res.body["_id"]
                done()
            })
    })
    it("Returns the newly added object", done => {
         api
            .get('/locations')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.body.find(location => location.city === newLocation.city)).to.be.an('object')
            })
            done()
    })
    it("New object has 'lat' 'long' 'city' 'state' and 'country'", done => {
        api
            .get('/locations')
            .set('Accept', 'application/json')
            .end((err, res) => {
                newObj = res.body.find(location => location["_id"] === newID)
                expect(newObj).to.have.property('lat')
                expect(newObj).to.have.property('long')
                expect(newObj).to.have.property('city')
                expect(newObj).to.have.property('state')
                expect(newObj).to.have.property('country')
            })
            done()
    })
})

describe("PATCH /locations/:id", () => {
    it("Returns an object", done => {
        api
            .patch(`/locations/${newID}`)
            .set('Accept', 'application/json')
            .send({"country" : "N"})
            .end((err, res) => {
                expect(res).to.be.an('object')
            })
            done()
    })
    it("Object is updated", done => {
        api
            .get(`/locations/${newID}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.country === "N")
            })
            done()
    })
})

describe("DELETE /locations/:id", () => {
    it("Returns an object", done => {
        api
            .delete(`/locations/${newID}`)
            .set('Accept', 'application/json')
            .end(done)
    })
    it("Object is deleted", done => {
        api
        .get('/locations')
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.body.find(location => location["_id"] === newID)).to.be.undefined
        })
        done()

    })
})
