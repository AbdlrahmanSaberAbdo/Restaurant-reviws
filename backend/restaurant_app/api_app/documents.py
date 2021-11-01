from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .models.City import City
from .models.Restaurant import Restaurant

@registry.register_document
class CityDocument(Document):
    id = fields.IntegerField()

    class Index:
        def __init__(self):
            pass

        name = 'cities'
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0,
        }

    class Django:
        def __init__(self):
            pass

        model = City
        fields = [
            'name'
        ]


@registry.register_document
class RestaurantDocument(Document):
    city = fields.ObjectField(properties ={
        'id': fields.IntegerField(),
        'name': fields.TextField()
    })
    reviews = fields.ObjectField(properties ={
        'id': fields.IntegerField(),
        'text_body': fields.TextField()
    })
    class Index:
        def __init__(self):
            pass

        name = 'restaurants'
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0,
        }

    class Django:
        def __init__(self):
            pass

        model = Restaurant
        fields = [
            'name'
        ]

