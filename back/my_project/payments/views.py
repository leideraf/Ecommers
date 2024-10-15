from django.shortcuts import render
from rest_framework import status, authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from account.models import Model, OrderModel
from datetime import datetime


# Create your views here.
def save_card_db(cardData, email, cardId, customerId, user):
    #Se guarda la tarjeta en la base de datos
    Model.objects.create(
        email = email,
        card_number = cardData['number'],
        exp_month = cardData['exp_month'],
        exp_year = cardData['exp_year'],
        card_id = cardId,
        customer_id = customerId,
        user = user
    )


class TestImplemetaction(APIView):

    def post(self, request):
        test_payment_process = {
            'amount': 100,
            'currency': 'COP',
            'description': 'Testing payment',
            'receipt_email': 'PUCP@gmail.com',
        }
        return Response(data=test_payment_process, status= status.HTTP_200_OK)
    
class CheckTokenValidation(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response('Token is Valid',status=status.HTTP_200_OK)
    
class CreateCardTokenView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        email = data['email']
        number = data['number']
        cardStatus = data['save_card']

        if not number.isdigit() or len(number) != 16:
            return Response({'detail': 'Invalid card number'}, status=status.HTTP_400_BAD_REQUEST)
        
        #token de la tarjeta
        dummyToken = {
            'id': 'dummy_token',
            'card': {
                'number': number,
                'exp_month': data['exp_month'],
                'exp_year': data['exp_year'],
                'cvc': data['cvc']
            }
        }
        
        #tarjeta para el cliente
        customer = {
            'id': 'dummy_customer_id',
            'sources': {
                'data': [
                    {
                        'last4': number[-4:],
                        'exp_month': data['exp_month'],
                        'exp_year': data['exp_year'],
                    }
                ]
            }
        }

        if cardStatus:
            try:
                save_card_db(data, email, dummyToken['id'], customer['id'], request.user)
                message = {"customer_id": customer['id'], "email": email, "card_data": dummyToken}
                return Response(message, status=status.HTTP_200_OK)
            except:
                message = {"detail": "Card already in use, please uncheck it or use another card."}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                message = {"customer_id": customer['id'], "email": email, "card_data": dummyToken}
                return Response(message, status=status.HTTP_200_OK)
            except:
                message = {"detail": "something went wrong, please try again."} 
                return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class RetrieveCardView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        card_details = {
            "customer_id": request.headers['customer_id'],
            "card_id" : request.headers['card_id'],
            "last4": "1234",
            "exp_month": "12",
            "exp_year": "2025"
        }
        return Response(card_details, status=status.HTTP_200_OK)

class CardUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def put(self, request):
        data = request.data

        update_card = {
            "customer_id": data['customer_id'],
            "card_id" : data['card_id'],
            "exp_month": data['exp_month'],
            "exp_year": data['exp_year'],
            "name_on_card": data['name_on_card']
        }

        model = Model.objects.get(card_number=data["card_number"])

        if model:
            model.name_on_card = data['name_on_card'] if data['name_on_card'] else model.name_on_card
            model.exp_month = data['exp_month'] if data['exp_month'] else model.exp_month
            model.exp_year = data['exp_year'] if data['exp_year'] else model.exp_year
            model.address_city = data['address_city'] if data['address_city'] else model.address_city
            model.address_state = data['address_state'] if data['address_state'] else model.address_state
            model.address_country = data['address_country'] if data['address_country'] else model.address_country
            model.address_zip = data['address_zip'] if data['address_zip'] else model.address_zip
            model.save()
        else:
            return Response({'detail': 'Card not found'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'detail': 'Card successfully updated', 'data': update_card}, status=status.HTTP_200_OK)
    
class DeleteCardView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self, request):
        data = request.data
        card = Model.objects.get(card_number=data["card_number"])
        if card:
            card.delete()
            return Response({'detail': 'Card successfully deleted'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Card not found'}, status=status.HTTP_404_NOT_FOUND)
        
class ChargeCustomerView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        data = request.data

        try:
            new_order = OrderModel.objects.create(
                name = data['name'],
                ordered_items = data['ordered_items'],
                card_number = data['card_number'],
                address = data['address'],
                paid_status = data['paid_status'],
                paid_at = datetime.now(),
                total_price = data['total_price'],
                is_delivered = data['is_delivered'],
                delivered_at = data['delivered_at'],
                user = request.user
            )

            return Response({'detail': 'Order successfully created', 'data': new_order.id}, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({'detail': 'Missing field: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'Something went wrong: ' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)