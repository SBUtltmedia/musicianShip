#!/bin/bash
echo "Hello, do you want to automatically process (batch process) all .WEBM video files in this folder (y/n)?"
read confirmation
if ["$confirmation" = "y"]; then
  echo "converting all .webm into .mp3..."
  for FILE in *.webm; do
    echo -e "Processing video '\e[32m$FILE\e[0m'";
    ffmpeg -i "${FILE}" -vn -ab 128k -ar 44100 -y "${FILE%.webm}.mp3";
  done;
fi

if ["$confirmation" != "n"]; then
   echo "Ok, never mind. Process aborted"
fi
