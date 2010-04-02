import os

BASE_PATH = os.path.dirname(__file__)

DATABASE_ENGINE = 'sqlite3'
DATABASE_NAME = 'example.db'

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'tastypie',
    'django_qunit',
    'notes',
]

QUNIT_TEST_DIRECTORY = os.path.join(BASE_PATH, 'qunit_tests')

DEBUG = True
TEMPLATE_DEBUG = DEBUG
ROOT_URLCONF = 'urls'
