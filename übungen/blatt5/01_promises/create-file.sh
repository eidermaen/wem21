#!/bin/bash

filename=$1
length=$2

touch ${filename}.txt

for i in {1..100000} ; do
    printf "File ${filename} Zeile ${i} \n" >> ${filename}.txt
done
