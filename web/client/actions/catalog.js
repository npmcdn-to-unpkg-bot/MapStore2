/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var API = {
    csw: require('../api/CSW'),
    wms: require('../api/WMS')
};

const RECORD_LIST_LOADED = 'RECORD_LIST_LOADED';
const RECORD_LIST_LOAD_ERROR = 'RECORD_LIST_LOAD_ERROR';
const CHANGE_CATALOG_FORMAT = 'CHANGE_CATALOG_FORMAT';

function recordsLoaded(options, result) {
    return {
        type: RECORD_LIST_LOADED,
        searchOptions: options,
        result: result
    };
}

function changeCatalogFormat(format) {
    return {
        type: CHANGE_CATALOG_FORMAT,
        format
    };
}

function recordsLoadError(e) {
    return {
        type: RECORD_LIST_LOAD_ERROR,
        error: e
    };
}
function getRecords(format, url, startPosition = 1, maxRecords, filter, options) {
    return (dispatch /* , getState */) => {
        // TODO auth (like) let opts = GeoStoreApi.getAuthOptionsFromState(getState(), {params: {start: 0, limit: 20}, baseURL: geoStoreUrl });
        API[format].getRecords(url, startPosition, maxRecords, filter, options).then((result) => {
            dispatch(recordsLoaded({
                url,
                startPosition,
                maxRecords,
                filter
            }, result));
        }).catch((e) => {
            dispatch(recordsLoadError(e));
        });
    };
}
function textSearch(format, url, startPosition, maxRecords, text, options) {
    return (dispatch /* , getState */) => {
        // TODO auth (like) let opts = GeoStoreApi.getAuthOptionsFromState(getState(), {params: {start: 0, limit: 20}, baseURL: geoStoreUrl });
        API[format].textSearch(url, startPosition, maxRecords, text, options).then((result) => {
            dispatch(recordsLoaded({
                url,
                startPosition,
                maxRecords,
                text
            }, result));
        }).catch((e) => {
            dispatch(recordsLoadError(e));
        });
    };
}

module.exports = {
    RECORD_LIST_LOADED,
    RECORD_LIST_LOAD_ERROR,
    CHANGE_CATALOG_FORMAT,
    getRecords,
    textSearch,
    changeCatalogFormat
};
