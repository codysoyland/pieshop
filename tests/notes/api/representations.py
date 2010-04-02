from tastypie.representations.models import ModelRepresentation
from notes.models import Note

class NoteRepresentation(ModelRepresentation):
    class Meta:
        queryset = Note.objects.all()

    def get_resource_uri(self):
        return '/api/notes/%s/' % self.instance.id
