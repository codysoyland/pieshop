from django.conf.urls.defaults import *
from notes.api.resources import NoteResource

import os
from django.conf import settings

note_resource = NoteResource()

urlpatterns = patterns('',
    (r'^api/notes/', include(note_resource.urls)),
    (r'(?P<path>pieshop\.js)', 'django.views.static.serve', {
        'document_root': os.path.join(settings.BASE_PATH, '../src/'),
    }),
    (r'^qunit/', include('django_qunit.urls')),
)
