from tastypie.resources import Resource
from notes.api.representations import NoteRepresentation

class NoteResource(Resource):
    representation = NoteRepresentation
    url_prefix = 'notes'
