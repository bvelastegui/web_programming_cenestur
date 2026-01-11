num1 = int(input("Ingrese el primer numero: "))
esPrimo = True

if num1 <= 1:
    esPrimo = False
for i in range(2, int(num1 ** 0.5) + 1):
    if num1 % i == 0:
        esPrimo = False
        break

if esPrimo:
    print("el numero: ", num1, " es primo")
else:
    print("el numero: ", num1, " no es primo")
