#!/usr/bin/env python3
import ipdb

filename = "merge.txt"
with open(filename, "r") as f:
    content = f.read()

dataset = content.split()
output = ""
for (idx, element) in enumerate(dataset, start=1):
    output += element
    if idx == (6**5):
        break
    elif idx % 36 == 0:
        output += '\n'
    else:
        output += ';'

#ipdb.set_trace()
print(output)
