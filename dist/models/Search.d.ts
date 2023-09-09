export default class Search {
    doSearch: ({ query, keys, list, fuziness }: {
        query: any;
        keys: any;
        list: any;
        fuziness?: number | undefined;
    }) => unknown[];
    private options;
}
