// Syntax highlighting for Plumlang source, at build time.
//
// A small scanner, not a parser: it knows comments, strings with their
// escapes and {interpolation}, numbers, keywords, constants, types and
// calls, which is all a reader needs to see the shape of a program. The
// output is HTML with `tok-*` classes; app/globals.css colours them.

const KEYWORDS = new Set([
  "plant", "root", "branch", "drop", "tree", "trait", "kind", "seed",
  "if", "else", "match", "for", "in", "while", "break", "continue", "return",
  "throw", "try", "catch", "finally", "spawn", "weak", "shared",
  "is", "as", "and", "or", "not", "self", "super",
]);

const CONSTANTS = new Set(["good", "bad", "true", "false", "none"]);

const BUILTIN_TYPES = new Set(["int", "float", "bool", "str", "byte", "list", "map", "set", "num"]);

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const span = (kind: string, text: string) => `<span class="tok-${kind}">${escapeHtml(text)}</span>`;

const isIdentStart = (c: string) => /[A-Za-z_]/.test(c);
const isIdent = (c: string) => /[A-Za-z0-9_]/.test(c);
const isDigit = (c: string) => c >= "0" && c <= "9";

/** Highlight Plumlang source; returns HTML. */
export function highlightPlum(source: string): string {
  return new Scanner(source).code(source.length);
}

class Scanner {
  pos = 0;
  readonly src: string;

  constructor(src: string) {
    this.src = src;
  }

  /** Code up to `end`, or up to an unmatched `}` when `inInterpolation`. */
  code(end: number, inInterpolation = false): string {
    const { src } = this;
    let out = "";
    let depth = 0;
    let previousWord = "";
    while (this.pos < end) {
      const c = src[this.pos];
      if (c === "#") {
        const nl = src.indexOf("\n", this.pos);
        const stop = nl === -1 || nl > end ? end : nl;
        out += span("comment", src.slice(this.pos, stop));
        this.pos = stop;
      } else if (c === '"') {
        out += this.string(end);
        previousWord = "";
      } else if (isDigit(c)) {
        const m = /^(0x[0-9A-Fa-f_]+|0o[0-7_]+|0b[01_]+|[0-9][0-9_]*(\.[0-9][0-9_]*)?([eE][+-]?[0-9_]+)?)/.exec(src.slice(this.pos, end));
        const text = m ? m[0] : c;
        out += span("number", text);
        this.pos += text.length;
        previousWord = "";
      } else if (isIdentStart(c)) {
        let stop = this.pos + 1;
        while (stop < end && isIdent(src[stop])) stop++;
        const word = src.slice(this.pos, stop);
        this.pos = stop;
        let next = stop;
        while (next < end && src[next] === " ") next++;
        if (CONSTANTS.has(word)) out += span("constant", word);
        else if (KEYWORDS.has(word)) out += span("keyword", word);
        else if (previousWord === "branch") out += span("function", word);
        else if (previousWord === "tree" || previousWord === "trait" || previousWord === "kind") out += span("type", word);
        else if (BUILTIN_TYPES.has(word) || /^[A-Z][a-z0-9]/.test(word) || /^[A-Z]$/.test(word)) out += span("type", word);
        else if (src[next] === "(") out += span("function", word);
        else if (/^[A-Z][A-Z0-9_]+$/.test(word)) out += span("constant", word);
        else out += escapeHtml(word);
        previousWord = word;
      } else if (inInterpolation && c === "{") {
        depth++;
        out += "{";
        this.pos++;
      } else if (inInterpolation && c === "}") {
        if (depth === 0) return out;
        depth--;
        out += "}";
        this.pos++;
      } else {
        const op = /^(=>|->|\?\?|\?\.|\.\.=|\.\.|==|!=|<=|>=|\*\*=?|\/\/=?|<<=?|>>=?|[-+*/%&|^~<>=!?:])/.exec(src.slice(this.pos, end));
        if (op) {
          out += span("operator", op[0]);
          this.pos += op[0].length;
        } else {
          out += escapeHtml(c);
          this.pos++;
        }
        if (c !== " " && c !== "\t") previousWord = "";
      }
    }
    return out;
  }

  /** A string literal at pos, with escapes and {interpolation}. */
  string(end: number): string {
    const { src } = this;
    const triple = src.startsWith('"""', this.pos);
    const quote = triple ? '"""' : '"';
    let out = `<span class="tok-string">${escapeHtml(quote)}`;
    this.pos += quote.length;
    let run = "";
    const flush = () => {
      out += escapeHtml(run);
      run = "";
    };
    while (this.pos < end) {
      const c = src[this.pos];
      if (src.startsWith(quote, this.pos)) {
        run += quote;
        this.pos += quote.length;
        flush();
        return `${out}</span>`;
      }
      if (!triple && c === "\n") break;
      if (c === "\\") {
        flush();
        const m = /^\\(u\{[0-9A-Fa-f]*\}|[\s\S])/.exec(src.slice(this.pos, end));
        const text = m ? m[0] : c;
        out += span("escape", text);
        this.pos += text.length;
      } else if (c === "{") {
        flush();
        this.pos++;
        const inner = this.code(end, true);
        const closed = src[this.pos] === "}";
        if (closed) this.pos++;
        out += `<span class="tok-interp">{</span><span class="tok-embedded">${inner}</span>${closed ? '<span class="tok-interp">}</span>' : ""}`;
      } else {
        run += c;
        this.pos++;
      }
    }
    flush();
    return `${out}</span>`;
  }
}

/** Highlight a shell, TOML or similar snippet: comments and strings only. */
export function highlightSimple(source: string): string {
  return source
    .split("\n")
    .map((line) => {
      const m = /^(.*?)(\s#.*|^#.*)$/.exec(line);
      const body = m ? m[1] : line;
      const comment = m ? m[2] : "";
      const html = escapeHtml(body).replace(/(&quot;[^&]*?&quot;)/g, '<span class="tok-string">$1</span>');
      return comment ? `${html}${span("comment", comment)}` : html;
    })
    .join("\n");
}

/** Highlighted HTML for a code block in the given language. */
export function highlight(code: string, lang: string | undefined): string {
  const language = (lang ?? "").toLowerCase();
  if (language === "plum" || language === "plumlang") return highlightPlum(code);
  if (["bash", "sh", "shell", "console", "toml", "bat", "powershell", "ps1"].includes(language)) return highlightSimple(code);
  return escapeHtml(code);
}

export { escapeHtml };
