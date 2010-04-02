var pieshop = {};

pieshop.resource = function(options) {
    ResourcePrototype = {};

    for (key in options) {
        ResourcePrototype[key] = options[key];
    }

    Resource = function(data) {
        for (key in data) {
            this[key] = data[key];
        }
    };
    Resource.prototype = ResourcePrototype;
    return Resource;
};

pieshop.query = function(Resource) {
    return new this.Query(Resource);
};

pieshop.Query = function (Resource) {
    this.resource = Resource;
};
pieshop.Query.prototype = {
    'get_params': function () {
        params = {
            'format': 'json'
        }

        if (typeof(this._limit) == 'integer') {
            params['limit'] = this._limit
        }

        return params;
    },
    'limit': function(limit) {
        new_query = new pieshop.Query(this.resource);
        new_query.prototype = this;
        new_query._limit = limit;
        return new_query;
    },
    'all': function(callback) {
        query = this;
        jQuery.ajax({
            url: this.resource.prototype.resource_uri,
            data: this.get_params(),
            success: function (data) {
                callback(pieshop.make_objects(data, query.resource));
            }
        });
    },
    'each': function(callback) {
        this.all(function(objects) {
            for (key in objects) {
                callback(objects[key]);
            }
        });
    }
};

pieshop.make_objects = function(data, resource) {
    objects = new Array();
    for (obj in data.results) {
        instance = new resource(data.results[obj]);
        objects.push(instance);
    }
    return objects;
};
