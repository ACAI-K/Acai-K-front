from django.shortcuts import render

# Create your views here.
def menu_admin_ldd(request):
    return render(request, 'menu_admin_ldd.html')

def crear_ldd(request):
    return render(request, 'crear_ldd.html')

def admin_ldd_habitaciones(request):
    return render(request, 'admin_ldd_habitaciones.html')

def crear_habitacion(request):
    return render(request, 'crear_habitacion.html')

def editar_ldd(request):
    return render(request, 'editar_ldd.html')

def editar_habitacion(request):
    return render(request, 'editar_habitacion.html')

def menu_admin(request):
    return render(request, 'menu_admin.html')

def registro_ldd(request):
    return render(request, 'registro_ldd.html')

def tickets(request):
    return render(request, 'tickets.html')

def ticket(request):
    return render(request, 'ticket.html')