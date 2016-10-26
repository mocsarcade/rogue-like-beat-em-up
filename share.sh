# This script will build the code and push it to Github Pages.

# To use, run with the "name of your build," like "pr13" or "v0.1.1".
# The name of your build can be whatever you want. Your build will
# be hosted at https://mocsarcade.github.io/gbjam5/NAME_OF_YOUR_BUILD.
#
#    $ ./share.sh NAME_OF_YOUR_BUILD
#

git clone https://github.com/mocsarcade/enchiridion --branch gh-pages shares

node build --production

mkdir -p ./shares/$1
cp -r ./builds/web/* ./shares/$1

git --git-dir=./shares/.git --work-tree=./shares add .
git --git-dir=./shares/.git --work-tree=./shares commit -m "Pushed $1"
git --git-dir=./shares/.git --work-tree=./shares push origin gh-pages

rm -rf shares

echo
echo Share your build by going to:
echo https://mocsarcade.github.io/enchiridion/$1
echo
