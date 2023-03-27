export default class Search {
    doSearch: ({ query, keys, list }: {
        query: any;
        keys?: string[] | undefined;
        list: any;
    }) => unknown[];
    private options;
}
