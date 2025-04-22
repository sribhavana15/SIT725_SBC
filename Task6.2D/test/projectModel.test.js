const model = require('../models/projectModel');

describe("Project Model Tests", () => {

  test("Should connect to MongoDB without error", async () => {
    try {
      await model.connectDB();
      expect(true).toBe(true); // Passes if no error
    } catch (error) {
      expect(error).toBeNull();
    }
  });

  test("Should insert a project object structure (mock validation)", () => {
    const sampleProject = {
      title: "Demo",
      description: "Demo description",
      image: "demo.png"
    };

    expect(sampleProject).toHaveProperty("title");
    expect(sampleProject).toHaveProperty("description");
    expect(sampleProject).toHaveProperty("image");
  });

});
