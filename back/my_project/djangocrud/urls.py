from django.urls import path
from djangocrud import views

urlpatterns = [
    path('registros/', views.RegistrosView.as_view(), name="register-list"),
    path('registros/<int:Id>', views.RegistrosDetail.as_view(), name="register-detail"),
    path('materias/', views.MateriasList.as_view(), name="materias-list"),
    path('materias/<int:Id>', views.MateriasDetail.as_view(), name="materias-detail"),
    path('horarios/', views.HorariosList.as_view(), name="horarios-list"),
    path('horarios/<int:Id>', views.HorariosDetail.as_view(), name="horarios-detail")
]