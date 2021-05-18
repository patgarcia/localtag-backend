const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:4000')

const testImage = {
    hq_image_url: 'https://i.imgur.com/mzGvrIc.jpg',
    thumbnail_url: 'https://i.imgur.com/KSpBpu9.jpg',
    description: 'test image for POST',
    source: 'devs'
}

let newID = ''

// test for 200 response, array return, objects contain fields
describe('GET /images', () => {
    it('should return a 200 response', done => {
        api
            .get('/images')
            .set('Accept', 'application/json') // accepting this type of data
            .expect(200, done) // expecting 200 response from server
    })
    it('should return an array', done => {
        api
            .get('/images')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.body).to.be.an('array')
                done()
            })
    })
    it("array's objects have fields 'hq_image_url', 'thumbnail_url', 'description', 'source'", done => {
        api
            .get('/images')
            .set('Accept', 'application/json')
            .end((error, response) => {
                response.body.forEach(image => {
                    expect(image).to.have.property('hq_image_url')
                    expect(image).to.have.property('thumbnail_url')
                    expect(image).to.have.property('description')
                    expect(image).to.have.property('source')
                })
            done()
            })
    })
})

describe('POST /images', () => {
    before(done => {
        api
            .post('/images')
            .set('Accept', 'application/json')
            .send(testImage)
            .end((req, res) => {
                newID = res.body["_id"]
                done()
            })
    })
    it('it should add a test image object to the collection images and return it', done => {
        api
            .get('/images')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.body.find(image => image.id === testImage.id)).to.be.an('object')
                done()
            })
    })
    it("new object has 'hq_image_url', 'thumbnail_url', 'description', 'source'", done => {
        api
            .get('/images')
            .set('Accept', 'application/json')
            .end((err, res) => {
                newObj = res.body.find(image => image["_id"] === newID)
                expect(newObj).to.have.property('hq_image_url')
                expect(newObj).to.have.property('thumbnail_url')
                expect(newObj).to.have.property('description')
                expect(newObj).to.have.property('source')
            })
            done()
    })
})

describe("PATCH /images/:id", () => {
    it("Returns an object", done => {
        api
            .put(`/images/${newID}`)
            .set('Accept', 'application/json')
            .send({"description": "patched description"})
            .end((err, res) => {
                expect(res).to.be.an.an('object')
            })
            done()
    })
    it("Object is updated", done => {
        api
            .get(`/images/${newID}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.description === "patched description")
            })
            done()
    })
})

describe("DELETE /images/:id", () => {
    it("Returns an object", done => {
        api
            .delete(`/images/${newID}`)
            .set('Accept', 'application/json')
            .end(done)
    })
    it("Object is deleted", done => {
        api
            .get('/images')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.body.find(image => image["_id"] === newID)).to.be.undefined
            })
            done()
    })
})
