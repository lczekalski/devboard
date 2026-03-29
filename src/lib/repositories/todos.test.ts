describe("todos", () => {
  it("should return todos", async () => {
    const todos = await getTodos()
    expect(todos).toBeDefined()
  })
})
