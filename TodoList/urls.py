
from django.contrib import admin
from django.urls import path
from django.shortcuts import redirect
from todos import views

urlpatterns = [
    path("admin/", admin.site.urls), 
    path("", lambda request: redirect("web_view")),
    path("webview/", views.web_view, name="web_view"),
    path("registerview/", views.register_view, name="register"),
    path("loginview/", views.login_view, name="login_view"),
    path("logoutview/", views.logout_view, name="logout_view"),
]