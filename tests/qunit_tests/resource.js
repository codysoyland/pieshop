Note = pieshop.resource({
    'resource_uri': '/api/notes/'
});

test('resource-basic', function () {
    ok(Note.prototype.resource_uri == '/api/notes/', 'resource URI intact');
    note = new Note({'content': 'This new API rocks da house!'});
    ok(note.resource_uri == '/api/notes/', 'resource api intact in instance');
    ok(note.content == 'This new API rocks da house!', 'note content preserved');
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

asyncTest('query-all', function() {
    query = pieshop.query(Note);
    expect(2);

    query.limit(2).all(function(notes) {
        ok(notes[0].title == "First Post!", 'title 0 is correct');
        ok(notes[1].title == "Another Post", 'title 1 is correct');
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
