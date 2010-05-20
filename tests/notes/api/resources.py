from tastypie.resources import ModelResource
from notes.models import Note

class NoteResource(ModelResource):
    def get_resource_uri(self, bundle):
        return '/api/notes/%s/' % bundle.obj.id

    class Meta:
        resource_name = 'notes'
        queryset = Note.objects.all()
