from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required


@login_required(login_url="/loginview/")

def web_view(request):
    return render(request, 'webfile.html')

def register_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        if not username or not password or not email:
            missing_fields = []
            if not username:
                missing_fields.append("username")
            if not email:
                missing_fields.append("email")
            if not password:
                missing_fields.append("password")

            error = "Please enter " + ", ".join(missing_fields)
            messages.info(request, error)
            return redirect(register_view)

        if User.objects.filter(username=username).exists():
            messages.info(request, "Username already exists")
            return redirect(register_view)

        User.objects.create_user(username=username, email=email, password=password)
        messages.success(request, "Username created successfully")
        return redirect(login_view)

    return render(request, 'register.html')

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        if not username and not password:
            messages.info(request, "Enter username and password")
            return redirect(login_view)
        if not username:
            messages.info(request, "Enter username")
            return redirect(login_view)
        if not password:
            messages.info(request, "Enter password")
            return redirect(login_view)

        if not User.objects.filter(username=username).exists():
            messages.info(request, "Invalid username")
            return redirect(login_view)

        user = authenticate(username=username, password=password)

        if user is None:
            messages.info(request, "Invalid password")
            return redirect(login_view)

        login(request, user)
        return redirect(web_view)

    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect(login_view)
