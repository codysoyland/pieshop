pieshop
=======

pieshop is a Javascript client for RESTful APIs. It is being developed as a
client for [django-tastypie](http://github.com/toastdriven/django-tastypie).

(disclaimer: pre-pre-pre alpha unstable untested unfinished and unready)

Python dependencies (for running tests)

-   django
-   django-tastypie
-   mimeparse
-   django-qunit

features
========

-   callback-driven chainable query interface inspired by Django's ORM
-   resource objects (aka "models")
-   filtering
-   limit/offset

goals
=====

The primary goal is to develop a complete Javascript abstraction of the django-tastypie RESTful API. Other goals include:

-   pluggable backends (more than just django-tastypie)
-   support for HTTP methods GET, POST, PUT, and DELETE.
-   validation/error handling
-   more delicious pie-themed goodness

Example usage
=============

    Person = pieshop.resource({
        'resource_uri': 'http://mysite.com/api/person/',
        'get_full_name': function(person) {
            return person.first_name + person.last_name;
        }
    });

    pieshop.query(Person).limit(10).offset(10).filter({'sex': 'female'}).each(function(person) {
        console.log(person);
        console.log(person.get_full_name());
    });

license
=======

Copyright (c) 2010 Cody Soyland

Released under new-style BSD license
