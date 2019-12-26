#!/bin/bash

FTPUSER=$1
FTPSERVER=$2

LOCAL_DIRECTORY="/home/constance/Documents/website_sources/"
REMOTE_DIRECTORY="www/"
EXCLUDE_DIR_OPTS="--exclude-glob scripts/ --exclude-glob src/ --exclude-glob .git/ --exclude-glob .gitignore"

lftp -e "mirror --delete --reverse ${EXCLUDE_DIR_OPTS} ${LOCAL_DIRECTORY} ${REMOTE_DIRECTORY}; exit" -u "${FTPUSER}" "${FTPSERVER}"
