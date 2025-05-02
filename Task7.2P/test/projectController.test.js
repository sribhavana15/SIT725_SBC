const controller = require('../controllers/projectController');

describe("Project Controller Tests", () => {

  test("Should fetch all projects (mocked)", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controller.getProjects(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test("Should create a new project and return confirmation", async () => {
    const req = {
      body: {
        title: "Test Project",
        description: "This is a test project",
        image: "test.png"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controller.createProject(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.any(String)
    }));
  });

});
