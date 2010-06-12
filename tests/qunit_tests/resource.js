Note = pieshop.resource({
    'resource_uri': '/api/v1/notes/',
    'slug_uppercase': function() {
        return this.slug.toUpperCase();
    }
});

test('resource-basic', function () {
    ok(Note.prototype.resource_uri == '/api/v1/notes/', 'resource URI intact');
    note = new Note({'content': 'This new API rocks da house!'});
    ok(note.resource_uri == '/api/v1/notes/', 'resource api intact in instance');
    ok(note.content == 'This new API rocks da house!', 'note content preserved');
});

test('resource-methods', function () {
    note = new Note({'slug': 'test-slug'});
    equal(note.slug_uppercase(), 'TEST-SLUG', 'resource method works');
});

test('query-basic', function () {
    query = pieshop.query(Note);
    ok(query instanceof pieshop.Query, 'query is a Query');
    ok(query.resource == Note, 'query resource is set');
    ok(typeof(query.each) == 'function', 'query method "each" available');
    ok(typeof(query.all) == 'function', 'query method "all" available');
    ok(typeof(query.limit) == 'function', 'query method "limit" available');
});

test('query-limit', function() {
    query = pieshop.query(Note);
    limited_query = query.limit(10);

    ok(limited_query instanceof pieshop.Query, 'limit() returns new query');
    ok(typeof(query._limit) == 'undefined', 'limit is not on first query.')
    ok(limited_query._limit == 10, 'limit is saved on second instance.')
});

test('query-offset', function() {
    query = pieshop.query(Note);
    offset_query = query.offset(10);

    ok(offset_query instanceof pieshop.Query, 'offset() returns new query');
    ok(offset_query._offset == 10, 'offset is saved')
});

test('query-copy', function() {
    expect(5);

    query = pieshop.query(Note);
    equal(typeof(query._limit), 'undefined', 'limit is undefined');

    query2 = query.copy({'_limit': 5});
    equal(query2._limit, 5, 'new limit is set');
    equal(typeof(query._limit), 'undefined', 'original limit is still undefined');

    query3 = query2.copy({'method': 'POST'});
    equal(query3.method, 'POST', 'query3 method is set to POST');
    equal(query3._limit, 5, 'limit set on query2 still carries over to query3');
});

test('query-filter', function() {
    expect(3);

    query = pieshop.query(Note);
    equal(typeof(query._filters), 'undefined');

    query = query.filter({'slug__startswith': 'a'});
    same(query._filters, {'slug__startswith': 'a'});

    query = query.filter({'is_active': true});
    same(query._filters, {'slug__startswith': 'a', 'is_active': true});
});

asyncTest('query-filter-startswith', function() {
    query = pieshop.query(Note);
    expect(2);

    query.filter({'slug__startswith': 'a'}).all(function(notes) {
        equal(notes.length, 1, 'only one note has a slug that starts with a');
        equal(notes[0].slug, 'another-post', 'slug is correct');
        start();
    });
});

asyncTest('query-filter-exact', function() {
    query = pieshop.query(Note);
    expect(2);

    query.filter({'slug': 'first-post'}).all(function(notes) {
        equal(notes.length, 1, 'only one note has that slug');
        equal(notes[0].slug, 'first-post', 'slug is correct');
        start();
    });
});

asyncTest('query-filter-bool', function() {
    query = pieshop.query(Note);
    expect(2);

    query.filter({'is_active': false}).all(function(notes) {
        equal(notes.length, 1, 'only one note is inactive');
        equal(notes[0].slug, 'inactive-post', 'slug is correct');
        start();
    });
});

asyncTest('query-filter-multi', function() {
    query = pieshop.query(Note);
    expect(2);

    query.filter({'title__endswith': 'Post'}).filter({'is_active': true}).all(function(notes) {
        equal(notes.length, 1, 'only one post means criteria');
        equal(notes[0].title, 'Another Post', 'slug is correct');
        start();
    });
});

asyncTest('query-all', function() {
    query = pieshop.query(Note);
    expect(3);

    query.limit(2).all(function(notes) {
        equal(notes.length, 2);
        equal(notes[0].title, "First Post!", 'title 0 is correct');
        equal(notes[1].title, "Another Post", 'title 1 is correct');
        start();
    });
});

asyncTest('query-offset-limit', function() {
    query = pieshop.query(Note);
    expect(4);

    query = query.limit(1).offset(1);
    equal(query._limit, 1);
    equal(query._offset, 1);

    query.limit(1).offset(1).all(function(notes) {
        equal(notes.length, 1);
        equal(notes[0].title, "Another Post", 'correct post fetched');
        start();
    });
});

asyncTest('query-each', function() {
    query = pieshop.query(Note);
    expect(2);

    query.limit(2).each(function(note) {
        ok(typeof(note.title) == 'string', 'the title is a string');
        start();
    });
});
