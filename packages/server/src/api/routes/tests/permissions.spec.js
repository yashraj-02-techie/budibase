const {
  createApplication,
  createTable,
  createRow,
  supertest,
  defaultHeaders,
  addPermission,
  publicHeaders,
  makeBasicRow,
} = require("./couchTestUtils")
const { BUILTIN_ROLE_IDS } = require("../../../utilities/security/roles")

const HIGHER_ROLE_ID = BUILTIN_ROLE_IDS.BASIC
const STD_ROLE_ID = BUILTIN_ROLE_IDS.PUBLIC

describe("/permission", () => {
  let server
  let request
  let appId
  let table
  let perms
  let row

  beforeAll(async () => {
    ;({ request, server } = await supertest())
  })

  afterAll(() => {
    server.close()
  })

  beforeEach(async () => {
    let app = await createApplication(request)
    appId = app.instance._id
    table = await createTable(request, appId)
    perms = await addPermission(request, appId, STD_ROLE_ID, table._id)
    row = await createRow(request, appId, table._id)
  })

  async function getTablePermissions() {
    return request
      .get(`/api/permission/${table._id}`)
      .set(defaultHeaders(appId))
      .expect("Content-Type", /json/)
      .expect(200)
  }

  describe("levels", () => {
    it("should be able to get levels", async () => {
      const res = await request
        .get(`/api/permission/levels`)
        .set(defaultHeaders(appId))
        .expect("Content-Type", /json/)
        .expect(200)
      expect(res.body).toBeDefined()
      expect(res.body.length).toEqual(2)
      expect(res.body).toContain("read")
      expect(res.body).toContain("write")
    })
  })

  describe("add", () => {
    it("should be able to add permission to a role for the table", async () => {
      expect(perms.length).toEqual(1)
      expect(perms[0]._id).toEqual(`${STD_ROLE_ID}`)
    })

    it("should get the resource permissions", async () => {
      const res = await request
        .get(`/api/permission/${table._id}`)
        .set(defaultHeaders(appId))
        .expect("Content-Type", /json/)
        .expect(200)
      expect(res.body["read"]).toEqual(STD_ROLE_ID)
      expect(res.body["write"]).toEqual(HIGHER_ROLE_ID)
    })

    it("should get resource permissions with multiple roles", async () => {
      perms = await addPermission(request, appId, HIGHER_ROLE_ID, table._id, "write")
      const res = await getTablePermissions()
      expect(res.body["read"]).toEqual(STD_ROLE_ID)
      expect(res.body["write"]).toEqual(HIGHER_ROLE_ID)
      const allRes = await request
        .get(`/api/permission`)
        .set(defaultHeaders(appId))
        .expect("Content-Type", /json/)
        .expect(200)
      expect(allRes.body[table._id]["write"]).toEqual(HIGHER_ROLE_ID)
      expect(allRes.body[table._id]["read"]).toEqual(STD_ROLE_ID)
    })
  })

  describe("remove", () => {
    it("should be able to remove the permission", async () => {
      const res = await request
        .delete(`/api/permission/${STD_ROLE_ID}/${table._id}/read`)
        .set(defaultHeaders(appId))
        .expect("Content-Type", /json/)
        .expect(200)
      expect(res.body[0]._id).toEqual(STD_ROLE_ID)
      const permsRes = await getTablePermissions()
      expect(permsRes.body[STD_ROLE_ID]).toBeUndefined()
    })
  })

  describe("check public user allowed", () => {
    it("should be able to read the row", async () => {
      const res = await request
        .get(`/api/${table._id}/rows`)
        .set(publicHeaders(appId))
        .expect("Content-Type", /json/)
        .expect(200)
      expect(res.body[0]._id).toEqual(row._id)
    })

    it("shouldn't allow writing from a public user", async () => {
      const res = await request
        .post(`/api/${table._id}/rows`)
        .send(makeBasicRow(table._id))
        .set(publicHeaders(appId))
        .expect("Content-Type", /json/)
        .expect(403)
      expect(res.status).toEqual(403)
    })
  })
})
