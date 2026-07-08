const CDN_BASE_URL = "https://cdn.jsdelivr.net/gh/athesto/diceware-es";
const WORD_LIST_PATH = "releases";
const DEFAULT_WORDLIST_VERSION = "latest";
const DEFAULT_SEPARATOR = ".";
const DEFAULT_WORDS_NUMBER = 4;
const DEFAULT_ADD_UPPERCASE_NUMERIC_TOKEN = true;

export class Diceware {
  constructor({
    addUppercaseNumericToken = DEFAULT_ADD_UPPERCASE_NUMERIC_TOKEN,
    separator = DEFAULT_SEPARATOR,
    wordListVersion = DEFAULT_WORDLIST_VERSION,
    wordsNumber = DEFAULT_WORDS_NUMBER,
  } = {}) {
    this.wordListVersion = wordListVersion;
    this.separator = separator;
    this.wordsNumber = wordsNumber;
    this.addUppercaseNumericToken = addUppercaseNumericToken;

    this.wordList = [];
  }
  static secureRandomInt(max, min = 0) {
    const range = max - min;
    const maxUint32 = 0xffffffff;
    const limit = maxUint32 - (maxUint32 % range);
    const random = new Uint32Array(1);

    do {
      crypto.getRandomValues(random);
    } while (random[0] >= limit);

    return min + (random[0] % range);
  }

  get wordListUrl() {
    return `${CDN_BASE_URL}/${WORD_LIST_PATH}/diceware-es-${this.wordListVersion}.txt`;
  }

  async load() {
    if (this.wordList.length) {
      return;
    }

    const response = await fetch(this.wordListUrl);
    if (!response.ok) {
      throw new Error(`Failed to load word list: ${response.statusText}`);
    }

    const text = (await response.text()).trim();
    this.wordList = text.split(/\r?\n/).map((word) => word.toLowerCase());

    return this.wordList;
  }

  entropy() {
    if (!this.wordList.length) {
      return 0;
    }
    let entropy = this.wordsNumber * Math.log2(this.wordList.length);
    if (this.addUppercaseNumericToken) {
      entropy += Math.log2(100 * 26);
    }

    return entropy;
  }

  async generate() {
    await this.load();
    const selectedWords = [];

    for (let i = 0; i < this.wordsNumber; i++) {
      const index = Diceware.secureRandomInt(this.wordList.length);
      selectedWords.push(this.wordList[index]);
    }

    if (this.addUppercaseNumericToken) {
      const digit = String(Diceware.secureRandomInt(100)).padStart(2, "0");
      const letter = String.fromCharCode(65 + Diceware.secureRandomInt(26));
      const position = Diceware.secureRandomInt(selectedWords.length + 1);
      selectedWords.splice(position, 0, `${letter}${digit}`);
    }
    return selectedWords.join(this.separator);
  }
}
