import Fuse from "fuse.js";
export default class Search {
    doSearch = ({ query, keys, list, fuziness = 0.25 }) => {
        const fuse = new Fuse(list, this.options(keys, fuziness));
        const fused = fuse.search(query);
        return fused.map(({ item }) => item);
    };
    options = (keys, fuziness) => {
        return {
            keys,
            threshold: fuziness,
            shouldSort: true,
        };
    };
}
