from django.conf.urls.defaults import *
from notes.api.resources import NoteResource

import os
from django.conf import settings

from notes.api.resources import NoteResource
from tastypie.api import Api

api = Api(api_name='v1')
api.register(NoteResource())

urlpatterns = patterns('',
    (r'^api/', include(api.urls)),
    (r'(?P<path>pieshop\.js)', 'django.views.static.serve', {
        'document_root': os.path.join(settings.BASE_PATH, '../src/'),
    }),
    (r'', include('django_qunit.urls')),
)
