from django.shortcuts import render
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegistrosSerializer, MateriasSerializer, HorariosSerializer
from .models import Materias, Registros, Horarios

# Create your views here.

class MateriasList(APIView):
    def get(self, request):
        materias = Materias.objects.all()
        serializer = MateriasSerializer(materias, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = MateriasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MateriasDetail(APIView):
    def get(self, request, Id):
        try:
            materia = Materias.objects.get(id=Id)
            serializer = MateriasSerializer(materia, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Materias.DoesNotExist:
            raise Http404("El id de la materia solicitada no existe")
        except:
            return Response("Algo ocurrio con el servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def put(self, request, Id):
        try:
            materia = Materias.objects.get(id=Id)
            serializer = MateriasSerializer(materia, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Materias.DoesNotExist:
            raise Http404("El id de la materia a actualizar no existe")
        except:
            return Response("Algo ocurrio con el servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, Id):
        try:
            materia = Materias.objects.get(id=Id)
            materia.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Materias.DoesNotExist:
            raise Http404("El id de la materia a eliminar no existe")
        except:
            return Response("Algo ocurrio con el servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class HorariosList(APIView):
    def get(self, request):
        horarios = Horarios.objects.all()
        serializer = HorariosSerializer(horarios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = HorariosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HorariosDetail(APIView):
    def get(self, request, Id):
        try:
            horario = Horarios.objects.get(id=Id)
            serializer = HorariosSerializer(horario, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Horarios.DoesNotExist:
            raise Http404("El id del horario solicitado no existe")
        except:
            return Response("Algo ocurrio con el servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def put(self, request, Id):
        try:
            horario = Horarios.objects.get(id=Id)
            serializer = HorariosSerializer(horario, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Horarios.DoesNotExist:
            raise Http404("El id del horario a actualizar no existe")
        except:
            return Response("Algo ocurrio con el servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, Id):
        try:
            horario = Horarios.objects.get(id=Id)
            horario.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Horarios.DoesNotExist:
            raise Http404("El id del horario a eliminar no existe")
        except:
            return Response("Algo ocurrio con el servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class RegistrosView(APIView):
    
    def get(sefl, request):
        registros = Registros.objects.all()
        serializer = RegistrosSerializer(registros, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = RegistrosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RegistrosDetail(APIView):
    def get(self, request, Id):
        try:
            registro = Registros.objects.get(id=Id)
            serializer = RegistrosSerializer(registro, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Registros.DoesNotExist:
            raise Http404("El id del registro solicitado no existe")
        except:
            return Response("Algo ocurrio con el servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def put(self, request, Id):
        try:
            registro = Registros.objects.get(id=Id)
            serializer = RegistrosSerializer(registro, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Registros.DoesNotExist:
            raise Http404("El id del registro a actualizar no existe")
        except:
            return Response("Algo ocurrio con el servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, Id):
        try:
            registro = Registros.objects.get(id=Id)
            registro.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Registros.DoesNotExist:
            raise Http404("El id del registro a eliminar no existe")
        except:
            return Response("Algo ocurrio con el servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
