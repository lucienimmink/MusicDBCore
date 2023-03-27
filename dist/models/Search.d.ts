export default class Search {
    doSearch: ({ query, keys, list }: {
        query: any;
        keys?: string[];
        list: any;
    }) => unknown[];
    private options;
}
