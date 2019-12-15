#!/bin/bash

JSSOURCE="js/pub/.source.txt"
CSSSOURCE="css/pub/.source.txt"
FONTSSOURCE="css/fonts/.source.txt"

while read -r line
do
	FILENAME=$(echo $line | awk '{print $1}')
	URL=$(echo $line | awk '{print $2}')
	curl "${URL}" -o "js/pub/${FILENAME}"
done < "${JSSOURCE}"

while read -r line
do
	FILENAME=$(echo $line | awk '{print $1}')
	URL=$(echo $line | awk '{print $2}')
	curl "${URL}" -o "css/pub/${FILENAME}"
done < "${CSSSOURCE}"

while read -r line
do
    FILENAME=$(echo $line | awk '{print $1}')
    URL=$(echo $line | awk '{print $2}')
    curl "${URL}" -o "css/fonts/${FILENAME}"
done < "${FONTSSOURCE}"
