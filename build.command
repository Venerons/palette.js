#!/bin/sh
echo -en "\033[1;31mStarting Palette.js Build...\n\033[0m"
cd /Users/Venerons/github/local/palette.js/
#
# HEADER
#
echo "// Palette.js v0.9.0 | Copyright (c) 2013-2014 Daniele Veneroni | Licensed under the MIT License (X11 License)" > headerjs
#
# JAVASCRIPT COMPRESSION
#
echo -en "\033[1;31mStarting JS compression...\n\033[0m"
if [ -e palette.min.js ]; then
	rm palette.min.js;
fi
java -jar /Users/Venerons/Documents/Developer/yuicompressor-2.4.8.jar palette.js -o palette.min.js --type js --charset utf-8 --preserve-semi
echo "" >> palette.min.js
mv palette.min.js tmp
cat headerjs tmp > palette.min.js
rm tmp
echo -en "\033[1;32mJS compression finished.\n\033[0m"
#
# CLEANUP
#
rm headerjs
echo -en "\033[1;32mPalette.js Build finished.\n\033[0m"
