class TrieNode {
  children: Map<string, TrieNode> = new Map();

  // Storing prefix is not required, but helps with debugging
  prefix: string = "";

  // This could be a boolean since we're storing the prefix
  word?: string;
}

class WordTrie {
  root: TrieNode = new TrieNode();

  addWord(word: string) {
    let node = this.root;
    let prefix = "";

    for (const char of word) {
      prefix = prefix + char;

      let child = node.children.get(char);

      if (!child) {
        child = new TrieNode();
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

  lookupChar(char: string, root: TrieNode) {
    return root.children.get(char);
  }
}

export function findWords(input: string, words: string[]): string[] {
  const foundWords: string[] = [];
  const trie = WordTrie.build(words);

  // Maintain a list of root nodes, each representing a potential
  // match in the trie
  const roots = new Set<TrieNode>();

  // Start searching from the root node
  roots.add(trie.root);

  for (const char of input) {
    // iterate over a copy of the list of roots, because we
    // modify the list in the loop
    for (const root of [...roots.values()]) {
      const child = trie.lookupChar(char, root);
      if (child) {
        // If the child is a word ending, add the word to the results
        // and keep searching this path since it's possible for words
        // to overlap
        if (child.word) {
          foundWords.push(child.word);
        }

        // Add the child as a root to continue searching this path
        // in the trie
        roots.add(child);
      } else if (root !== trie.root) {
        // Remote extra search roots if they hit a dead end
        roots.delete(root);
      }
    }
  }

  return foundWords;
}
