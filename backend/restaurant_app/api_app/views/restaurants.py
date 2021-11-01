import sys
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from ..models.Restaurant import Restaurant
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, viewsets
from rest_framework import filters
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from ..serializers.restaurants import RestaurantSerializer


class RestaurantListView(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    queryset  = Restaurant.objects.all()

    filter_backends  = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter,)
    filter_fields   = ('name', 'city__name',)
    ordering_fields = ('id', 'name',)
    search_fields   = ('name','city__name')

    def get_queryset(self):
        queryset = super().filter_queryset(self.queryset)
        return queryset

class RestaurantCountView(APIView):
    """
    A view that returns the count of active users.
    """
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        restaurants_count = Restaurant.objects.count()
        content = {'restaurants_count': restaurants_count}
        return Response(content)