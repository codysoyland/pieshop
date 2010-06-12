var pieshop = {};

pieshop.TastyPieBackend = {
    // generate resource objects from given json representation
    'build_resources': function(data, resource_type) {
        var objects = new Array();
        for (obj in data.objects) {
            var instance = new resource_type(data.objects[obj]);
            objects.push(instance);
        }
        return objects;
    },
    // generate json representation of given resource
    // (commenting out until tests are written)
    // 'build_representation': function(resource) {
    //     data = {'fields': {}};
    //     for(var i in objects) {
    //         data.fields[i] = resource[i];
    //     }
    //     return data;
    // },
    // generate data to send to server from given query
    'build_querydata': function(query) {
        var data = {
            'format': 'json'
        };
        if (query._limit) {
            data.limit = query._limit;
        }
        if (query._offset) {
            data.offset = query._offset;
        }
        if (query._filters) {
            for (filter in query._filters) {
                data[filter] = query._filters[filter];
            }
        }
        return data;
    },
    // perform given query and execute given callback after query
    'perform': function(query, callback) {
        var backend = this;
        var data = backend.build_querydata(query);
        if(typeof(callback) != 'function') {
            callback = function(data) {};
        }
        var resource_uri = query.resource.prototype.resource_uri;
        jQuery.ajax({
            'url': resource_uri,
            'data': data,
            'type': query.method,
            'success': function(data) {
                var resources = backend.build_resources(data, query.resource);
                callback(resources);
            }
        });
    }
};

pieshop.resource_factory = function(options) {
    var ResourcePrototype = {};

    for (key in options) {
        ResourcePrototype[key] = options[key];
    }

    if (typeof(ResourcePrototype.backend) == 'undefined') {
        ResourcePrototype.backend = pieshop.TastyPieBackend;
    }

    Resource = function(data) {
        for (key in data) {
            this[key] = data[key];
        }
    };
    Resource.prototype = ResourcePrototype;
    return Resource;
};

pieshop.resource = pieshop.resource_factory;

pieshop.query = function(Resource) {
    return new this.Query(Resource);
};

pieshop.Query = function(Resource) {
    this.resource = Resource;
    this.method = 'GET';
};

pieshop.Query.prototype = {
    'copy': function(params) {
        var new_query = new pieshop.Query(this.resource);
        for(var i in this) {
            if(this.hasOwnProperty(i)) {
                new_query[i] = this[i];
            }
        }
        for(var i in params) {
            new_query[i] = params[i];
        }
        return new_query;
    },
    'limit': function(limit) {
        var copy = this.copy({
            '_limit': limit,
        });
        return copy;
    },
    'offset': function(offset) {
        var copy = this.copy({
            '_offset': offset,
        });
        return copy;
    },
    'filter': function(params) {
        if (this._filters) {
            var new_params = this._filters;
        } else {
            var new_params = {};
        }
        for (var i in params) {
            new_params[i] = params[i];
        }
        return this.copy({
            '_filters':new_params
        });
    },
    // commenting this out until tests are written
    //'delete': function(callback) {
    //    this.method = 'DELETE'
    //    this.resource.prototype.backend.perform(this, callback);
    //},
    'all': function(callback) {
        var query = this.copy({
            'method': 'GET'
        });
        this.resource.prototype.backend.perform(query, callback);
    },
    'each': function(callback) {
        this.all(function(objects) {
            for (key in objects) {
                callback(objects[key]);
            }
        });
    }
};
