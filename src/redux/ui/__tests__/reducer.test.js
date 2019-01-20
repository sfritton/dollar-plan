import { handleSetPage, handleSetEditing } from "../reducer";

describe("set page", () => {
  it("sets the page", () => {
    const page = "CATEGORY";

    const payload = { page };

    expect(handleSetPage({}, payload)).toMatchInlineSnapshot(`
Object {
  "page": "CATEGORY",
}
`);
  });
});

describe("set editing", () => {
  it("sets editing to false", () => {
    const editing = false;

    const payload = { editing };

    expect(handleSetEditing({ editing: true }, payload)).toMatchInlineSnapshot(`
Object {
  "editing": false,
}
`);
  });
});
