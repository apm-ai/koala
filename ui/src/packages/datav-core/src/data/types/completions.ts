export interface CompletionItem {
    /**
     * The label of this completion item. By default
     * this is also the text that is inserted when selecting
     * this completion.
     */
    label: string;
  
    /**
     * The kind of this completion item. An icon is chosen
     * by the editor based on the kind.
     */
    kind?: CompletionItemKind | string;
  
    /**
     * A human-readable string with additional information
     * about this item, like type or symbol information.
     */
    detail?: string;
  
    /**
     * A human-readable string, can be Markdown, that represents a doc-comment.
     */
    documentation?: string;
  
    /**
     * A string that should be used when comparing this item
     * with other items. When `falsy` the `label` is used.
     */
    sortText?: string;
  
    /**
     * A string that should be used when filtering a set of
     * completion items. When `falsy` the `label` is used.
     */
    filterText?: string;
  
    /**
     * A string or snippet that should be inserted in a document when selecting
     * this completion. When `falsy` the `label` is used.
     */
    insertText?: string;
  
    /**
     * Delete number of characters before the caret position,
     * by default the letters from the beginning of the word.
     */
    deleteBackwards?: number;
  
    /**
     * Number of steps to move after the insertion, can be negative.
     */
    move?: number;
  }

  export enum CompletionItemKind {
    GroupTitle = 'GroupTitle',
  }