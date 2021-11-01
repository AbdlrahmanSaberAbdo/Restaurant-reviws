import sys
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
#models
from ..models.City import City
#filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from ..serializers.cities import CitySerializer

class CityListView(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset  = City.objects.all()

    filter_backends  = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter,)
    filter_fields   = ('name',)
    ordering_fields = ('id',)
    search_fields   = ('name',)

    def get_queryset(self):
        queryset = super().filter_queryset(self.queryset)
        return queryset

class CityCountView(APIView):
    """
    A view that returns the count of active users.
    """
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        cities_count = City.objects.count()
        content = {'cities_count': cities_count}
        return Response(content)