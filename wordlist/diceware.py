#!/usr/bin/env python3
import random
import csv
from collections import namedtuple

FileSpec = namedtuple('FileSpec', ['name', 'delimiter'])

def rollDices(dices=5):
    nums = []
    for x in range(dices):
        nums.append(random.randint(1,6))
    return nums

def dice2dec(dices):
    senary_number = [str(x - 1) for x in dices]
    return int("".join(senary_number), 6)

def getWords(lines):
    set_of_lines = set(lines)
    filename = [
            FileSpec('DW-es-bonito.csv', ','),
            FileSpec('words.txt', '\t'),
    ][0]
    output = {}
    with open(filename.name, 'r', newline='') as f:
        reader = csv.reader(f, delimiter=filename.delimiter)
        for (num, data) in enumerate(reader, start=1):
            if num in set_of_lines:
                [code, word] = data[:2]
                output[code] = word
    return output

def main():
    word_counter = 5
    codes = []
    numbers = []
    while len(codes) < word_counter:
        dices = rollDices(5)
        code = "".join(map(str, dices))
        number = dice2dec(dices) + 1
        if code not in codes:
            codes.append(code)
            numbers.append(number)

    words = getWords(numbers)

    print("-".join(codes))
    print("-".join(map(str,numbers)))
    print("-".join([words[code] for code in codes]))

main()
