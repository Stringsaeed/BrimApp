import { cipherTitle, getNoteTitle } from "./noteTitle";

describe("note title", () => {
  it("should get the note title from simple html", () => {
    const note = "<div>note</div>";

    expect(getNoteTitle(note)).toEqual("note");
  });

  it("should get the note title from nested html", () => {
    const note = "<div><span>note</span></div>";

    expect(getNoteTitle(note)).toEqual("note");
  });

  it("should get the note title from nested html with attributes", () => {
    const note = '<div class="note"><span>note</span></div>';

    expect(getNoteTitle(note)).toEqual("note");
  });

  it("should get the note title from nested html with attributes and multiple tags", () => {
    const note =
      '<hr id="null"><hr id="null"><hr id="null"><ul><li><hr id="null" style="font-size: 1em;">dsadas</li><li>dsadas</li><li>dsadas</li></ul><div>testststs</div>';

    expect(getNoteTitle(note)).toEqual("dsadas");
  });

  it("2. should get the note title from nested html with attributes and multiple tags", () => {
    const note = "<div>Test <i>something</i></div>";

    expect(getNoteTitle(note)).toEqual("Test something");
  });

  it("should get note title from string only", () => {
    const note = "note";

    expect(getNoteTitle(note)).toEqual("note");
  });

  it("3. should get note title from string only", () => {
    const note = "<div>note</div><div>note</div";

    expect(getNoteTitle(note)).toEqual("note");
  });

  it("should cipher the title", () => {
    const title = "note";

    expect(cipherTitle(title)).toEqual("n***");
  });

  it("should return empty string if title is empty", () => {
    const title = "";

    expect(getNoteTitle(title)).toEqual("");
  });
});
