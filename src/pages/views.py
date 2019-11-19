from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request, "home.html", {})

def session_view(request, *args, **kwargs):
    return HttpResponse("<h1>Sessions</h1>")
