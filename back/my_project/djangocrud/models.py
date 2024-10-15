from django.db import models

# Create your models here.
class Materias(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        texto = "{0}"
        return texto.format(self.nombre)
    
class Horarios(models.Model):
    class Jornadas(models.TextChoices):
        MAÑANA = "AM", ("Mañana")
        TARDE = "PM", ("Tarde")

    id = models.AutoField(primary_key=True)
    horaInicio = models.DateTimeField(null=True)
    horaFin = models.DateTimeField(null=True)
    jornada = models.CharField(
        max_length=2,
        choices=Jornadas,
        default=Jornadas.MAÑANA,
    )

    def __str__(self):
        texto = "{0}"
        return texto.format(self.jornada)
    


class Registros(models.Model):
    id = models.AutoField(primary_key=True)
    nombres = models.CharField(max_length=80)
    apellidos = models.CharField(max_length=80)
    correo = models.CharField(max_length=40)
    materia = models.ForeignKey(Materias, on_delete=models.CASCADE)
    horario = models.ForeignKey(Horarios, on_delete=models.CASCADE, null=True)

    def __str__(self):
        texto = "{0} {1} - {2} - {3}"
        return texto.format(self.nombres, self.apellidos, self.correo, self.materia)
