pieshop
=======

pieshop is a Javascript client for RESTful APIs. It is being developed as a client for django-tastypie.

(disclaimer: pre-pre-pre alpha unstable untested unfinished and unready)

**more to come! soon, hopefully**

Python dependencies:

-   django
-   django-tastypie
-   mimeparse
-   django-qunit (only to run unit tests)

Javascript dependencies:

-   jQuery

goals
=====

The primary goal is to develop a complete Javascript abstraction of the django-tastypie RESTful API. Other goals include:

-   removing the jQuery dependency
-   pluggable backends (more than just django-tastypie)
-   complete filtering/ordering/paginating functionality
-   support for HTTP methods GET, POST, PUT, and DELETE.
-   validation/error handling
-   more delicious pie-themed goodness

this doesn't work
-----------------

**but it's coming:**

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
