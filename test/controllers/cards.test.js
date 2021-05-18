const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:4000')

const testCard = {
    image: {img: 'https://i.imgur.com/mzGvrIc.jpg'},
    owner: 'ronnieross711',
    hashtag: 'hound',
    location: {city: "NYC"},
    vote_tally: 64,
    represents_collection: false,
    collectionID: '5b723j'
}

let newID = ''

describe('GET /cards', () => {
    it('should return a 200 response', done => {
        api
            .get('/images')
            .set('Accept', 'application/json')
            .expect(200, done)
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
    it("array's objects have fields 'image', 'owner', 'hashtag', 'location', 'vote_tally','represents_collection', 'collectionID'", done => {
        api
            .get('/cards')
            .set('Accept', 'application/json')
            .end((error, response) => {
                response.body.forEach(card => {
                    expect(card).to.have.property('image')
                    expect(card).to.have.property('owner')
                    expect(card).to.have.property('hashtag')
                    expect(card).to.have.property('location')
                    expect(card).to.have.property('vote_tally')
                    expect(card).to.have.property('represents_collection')
                    expect(card).to.have.property('collectionID')
                })
                done()
            })
    })
})

describe('POST /images', () => {
    before(done => {
        api
            .post('/cards')
            .set('Accept', 'application/json')
            .send(testCard)
            .end((req, res) => {
                newID = res.body["_id"]
                done()
            })
    })
    it('should add a test card object to the collection cards and return it', done => {
        api
            .get('/cards')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.body.find(card => card.id === testCard.id)).to.be.an('object')
                done()
            })
    })
    it("new object has 'image', 'owner', 'hashtag', 'location', 'vote_tally','represents_collection', 'collectionID'", done => {
        api
            .get('/cards')
            .set('Accept', 'application/json')
            .end((err, res) => {
                newObj = res.body.find(card => card["_id"] === newID)
                expect(newObj).to.have.property('image')
                expect(newObj).to.have.property('owner')
                expect(newObj).to.have.property('hashtag')
                expect(newObj).to.have.property('location')
                expect(newObj).to.have.property('vote_tally')
                expect(newObj).to.have.property('represents_collection')
                expect(newObj).to.have.property('collectionID')
            })
            done()
    })
})

describe("PATCH /cards/:id", () => {
    it('Returns an object', done => {
        api
            .put(`/cards/${newID}`)
            .set('Accept', 'application/json')
            .send({"hashtag": "patch_test"})
            .end((err, res) => {
                expect(res).to.be.an(object)
            })
            done()
    })
    it('Object is updated', done => {
        api
            .get(`/cards/${newID}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.hashtag === "patch_test")
            })
            done()
    })
})

describe("DELETE /cards/:id", () => {
    it('Returns an object', done => {
        api
            .delete(`/cards/${newID}`)
            .set('Accept', 'application/json')
            .end(done)
    })
    it('Object is deleted', done => {
        api
            .get('/images')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.body.find(card => card["_id"] === newID)).to.be.undefined
            })
            done()
    })
})
