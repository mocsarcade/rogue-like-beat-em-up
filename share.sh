# To run:
# ./share.sh v.0.0.1

git clone https://github.com/mocsarcade/enchiridion --branch gh-pages shares

node build

mkdir -p ./shares/$1
cp -r ./builds/web/* ./shares/$1

git --git-dir=./shares/.git --work-tree=./shares add $1
git --git-dir=./shares/.git --work-tree=./shares commit -m "Pushed $1"
git --git-dir=./shares/.git --work-tree=./shares push origin gh-pages

rm -rf shares

echo
echo Share your build by going to:
echo https://mocsarcade.github.io/enchiridion/$1
echo
