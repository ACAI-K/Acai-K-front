from django.urls import path

from . import views

app_name = 'lucyApp'

urlpatterns = [
    path('menu_admin_ldd/', views.menu_admin_ldd, name='menu_admin_ldd'),
    path('crear_ldd/', views.crear_ldd, name='crear_ldd'),
    path('admin_ldd_habitaciones/', views.admin_ldd_habitaciones, name='admin_ldd_habitaciones'),
    path('crear_habitacion/', views.crear_habitacion, name='crear_habitacion'),
    path('editar_ldd/', views.editar_ldd, name='editar_ldd'),
    path('editar_habitacion/', views.editar_habitacion, name='editar_habitacion'),
    path('menu_admin/', views.menu_admin, name='menu_admin'),
    path('registro_ldd/', views.registro_ldd, name='registro_ldd'),
    path('tickets/', views.tickets, name='tickets'),
    path('ticket/', views.ticket, name='ticket'),
    path('busqueda/', views.busqueda, name='busqueda'),
]