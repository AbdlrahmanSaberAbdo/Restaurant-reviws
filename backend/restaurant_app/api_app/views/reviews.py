import sys
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from ..models.Review import Review
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from ..serializers.reviews import ReviewSerializer

class ReviewListView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset  = Review.objects.all()

    filter_backends  = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter,)
    filter_fields   = ('restaurant__name',)
    ordering_fields = ('id',)
    search_fields   = ('text_body','restaurant__name')

    def get_queryset(self):
        queryset = super().filter_queryset(self.queryset)
        return queryset

class ReviewCountView(APIView):
    """
    A view that returns the count of active users.
    """
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        reviews_count = Review.objects.count()
        content = {'reviews_count': reviews_count}
        return Response(content)