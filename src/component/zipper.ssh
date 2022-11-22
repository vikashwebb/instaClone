#!/bin/bash
MAX_ZIP_SIZE=198 #in MB
ZIP_PREFIX="kx_image_chunk_"

max_zip_size_bytes=$(( MAX_ZIP_SIZE*1000000 ))
files=($( ls * )) #Add () to convert output to array
total_files=${#files[@]}
file_counter=0
zip_counter=1

zip_files() {
    zip_size=0
    file_list=""

    echo Working on ZIP $zip_counter.

    for file_name in $1 ; do
        #Find out the would be ZIP size if this file were to be included
        current_file_size=$(ls -l $file_name | awk '{print  $5}')
        (( zip_size+=$((10#$current_file_size)) )) # using '10#' to tell the shell that the variable is a number in base 10.

        #Stop adding files to ZIP if the max size limit is exceeded
        if (( zip_size>=max_zip_size_bytes )); then
            echo ZIP size $(( zip_size/1000000 ))MB exceeds the limit. Stopping further file addition for this chunk now.
            break
        fi

        file_list+=" "$file_name
        (( file_counter+=1 ))
    done

    file_list="${file_list:1}" #Remove extra space at the begning of the file list.

    echo Zipping...
    zip $ZIP_PREFIX$zip_counter".zip" $file_list
    (( zip_counter+=1 ))

    # echo List of files included in this ZIP chunk: $file_list
}

for (( i=0; $file_counter<$total_files; i++ )); do
    zip_files "${files[*]:$file_counter}"
done