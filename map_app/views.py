from django.shortcuts import render
from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from basicauth.decorators import basic_auth_required

@method_decorator(basic_auth_required, name='dispatch')
class IndexView(TemplateView):
    template_name = 'map_app/index.html'
