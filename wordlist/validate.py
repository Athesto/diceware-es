#!/usr/bin/env python3
from collections import namedtuple

FileSpec = namedtuple('T', ['name', 'delimiter', 'start', 'position'])


files = [
    FileSpec('nuevas/sustantivos.txt', '\t', 0, 0),
    FileSpec('output.txt', ',', 0, 0),
    FileSpec('words.txt', '\t', 0, 1),
    FileSpec('words-CREA-4a7.txt', ',', 0, 0),
]


import csv

def get_data(filename, position, delimiter=','):
    names = set()
    with open(filename, 'r') as f:
        reader = csv.reader(f, delimiter=delimiter)
        for line in reader:
            names.add(line[position].lower())
    return names

ref = files[0]
names = files[1]

ref = get_data(ref.name, ref.position, ref.delimiter)
names = get_data(names.name, names.position, names.delimiter)

names_missing = sorted(list(ref-names))
ref_missing = sorted(list(names-ref))

for x in names_missing:
    print(x)
