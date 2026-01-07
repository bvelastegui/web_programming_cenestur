print("Bienvenido a mi aplicación")
letter = input("Ingresa tu palabra:").lower()

if letter == letter[::-1]:
    print("Felicitaciones tu palabra es un palíndromo")
else:
    print("No es palíndromo")