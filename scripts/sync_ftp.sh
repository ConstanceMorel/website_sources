#!/bin/bash

FTPUSER=$1
FTPSERVER=$2

LOCAL_DIRECTORY="${PWD}/"
if ! [ -d "${LOCAL_DIRECTORY}/.git" ]; then
    echo "${LOCAL_DIRECTORY}/.git not found..."
    echo "You may be in the wrong path"
    exit 1
fi

REMOTE_DIRECTORY="www/"
EXCLUDE_DIR_OPTS="--exclude-glob scripts/ --exclude-glob src/ --exclude-glob .git/ --exclude-glob .gitignore --exclude-glob .DS_Store"

lftp -e "mirror --delete --reverse ${EXCLUDE_DIR_OPTS} ${LOCAL_DIRECTORY} ${REMOTE_DIRECTORY}; exit" -u "${FTPUSER}" "${FTPSERVER}"
