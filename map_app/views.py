from django.shortcuts import render
from django.views.generic import TemplateView

class IndexView(TemplateView):
    template_name = 'map_app/index.html'