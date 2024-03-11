class WordTrie {
  // Map of characters to child nodes
  children: Map<string, WordTrie> = new Map();

  // Storing prefix is not required, but helps with debugging
  prefix: string = "";

  // If the node represents a word, store the word. Otherwise
  // it's undefined. This could be a boolean since we're storing
  // the prefix
  word?: string;

  addWord(word: string) {
    let node: WordTrie = this;
    let prefix = "";

    for (const char of word) {
      prefix = prefix + char;

      let child = node.children.get(char);

      if (!child) {
        child = new WordTrie();
        child.prefix = prefix;
        node.children.set(char, child);
      }

      node = child;
    }

    // Store word in last node for the word
    node.word = word;
  }

  static build(words: string[]) {
    const trie = new WordTrie();

    for (const word of words) {
      trie.addWord(word);
    }

    return trie;
  }

  lookup(char: string, root: WordTrie) {
    return root.children.get(char);
  }
}

export function findWords(input: string, words: string[]): string[] {
  const foundWords: string[] = [];
  const trie = WordTrie.build(words);

  // Maintain a list of root nodes, each representing a potential
  // match in the trie
  const roots = new Set<WordTrie>();

  // Start searching from the root node
  roots.add(trie);

  for (const char of input) {
    // Iterate over a *copy* of the set of roots, because we
    // modify the set within the loop
    for (const root of [...roots.values()]) {
      const child = trie.lookup(char, root);
      if (child) {
        // If the child is a word ending, add the word to the results
        // and keep searching this path since it's possible for words
        // to overlap. For example, RACE and RACECAR lie along the same
        // path but count as two words.
        if (child.word) {
          foundWords.push(child.word);
        }

        // Add the child to the set of roots to continue searching this
        // path in the trie.
        roots.add(child);
      } else if (root !== trie) {
        // Remote extra search roots if they hit a dead end
        roots.delete(root);
      }
    }
  }

  return foundWords;
}
